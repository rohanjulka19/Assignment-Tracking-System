const express = require('express');
const router = express.Router();
const path = require('path');
const model = require('../models/models');
const jwt = require('jsonwebtoken');
const config = require('../config');
const secret = config.secret;
//const model = model.model ;


router.get('/', function(req,res) {
    console.log("/ called");
    res.sendFile(path.join(__dirname ,'../views/login.html'));
});

router.get('/subjects', function(req,res) {
    console.log('/subjects called');
    
    if(req.query.type == "student") {

        let std_class = req.body.class ;
        let std_sec = req.body.sec ;
        let query = "SELECT Subjects.name , Subjects.course_code , Subject_alloted.class , Subject_alloted.sec " + 
                    "FROM Subjects" +
                    "INNER JOIN  Subject_alloted" +
                    "ON Subjects.course_code = Subject_alloted.course_code AND " +
                    "Subject_alloted.class = $1 AND Subject_alloted.sec = $2"; 
                    /* operator does not exist: "char"[] = text 
                     ON Subject.course_code = Subject_alloted...*/

        model.query(query , [std_class , std_sec] ,function(res,err) {

            if(err) {
                console.log("Error in /select ", err);
                res.status(400).send(err);
            }
            res.setHeader('content-type', 'application/json');
            res.status(200).send(results.rows);
        });
    } else if(req.query.type == "teacher") {
        console.log('calling teacher');
        let teacher_id = req.query.teacher_id ;
        console.log(teacher_id);
        let query = "SELECT Subjects.name , Subjects.course_code , Subject_alloted.class , Subject_alloted.sec " + 
                    "FROM Subjects" +
                    " INNER JOIN  Subject_alloted " +
                    " ON Subjects.course_code = Subject_alloted.subject_course_code AND " +
                    "Subject_alloted.teacher_id = '101' "; 
        console.log(query);
        model.query(query , [] ,(err,result) => {
    
            if(err) {
                console.log("Error in /select ", err);
                res.status(400).send(err);
            }
            res.setHeader('content-type', 'application/json');
            res.status(200).send(result.rows);
        });
        console.log('query complete');
    }
});

router.post('/login',function(req,res) {
    console.log("/login called");
   // console.log("Request header" + req.headers + " req body " + req.body);
    let username = req.body.username;
    let password = req.body.password; 
    console.log('username' + username +' passowrd' + password);
    let select = req.body.selection ;
   // console.log('Select ' + select) ; 
	if (username && password) {
    model.query('SELECT * FROM teacher WHERE id = $1 AND password = $2', [username,password], 
    function(error, results) {
      if(error) {
        console.log("error ocurred",error);
      }
      //console.log(results);
			if (results.rowCount > 0) {
                const token = jwt.sign({role : 'teacher' , user : username}, secret , {algorithm : 'HS256'});
                console.log("TOKEN"+token); 
                let cookieData = 'auth=' + token ;
                res.cookie('auth' , token );
                res.setHeader('Set-Cookie' , 'auth=' + token + ';HttpOnly');

                //res.redirect('/assignmentPage');
			} else {
                model.query('SELECT * FROM student WHERE regno = ? AND password = ?', [username,password],
                function(error , results) {
                    if(error) {
                        console.log("Error ocurred", error);
                    }
                    if(results.rowCount > 0) {
                        generateJwtToken('student');
                        console.log("TOKEN"+token); 
                        res.status(200).json({token});
                        //res.redirect('/assignmentPage');
                    }
                    else {
                        console.log('Wrong Username or Password');
                    }
                });
            }	
    
        res.end(); 
        });
        
	} else {
    //response.send('Please enter Username and Password!');
    //alert("Please Enter Username and Password");
		res.redirect('/');
	}
});


function generateJwtToken(role) {
    const token = jwt.sign({role : role}, secret , {algorithm : 'HS256'}, function(err,token) {
           if(err) {
               console.log(err);
           }
           console.log(token);
           decodeToken(token); 
       } );
   return token ;
}

function decodeToken(token) {
   const decoded = jwt.decode(token , {complete : true});
   console.log(decoded.header);
   console.log(decoded.payload);

}

module.exports = router ;