const express = require('express');
const router = express.Router();
const path = require('path');
const model = require('../models/models');
const jwt = require('jsonwebtoken');
const secret = require('../config');
const pool = model.pool ;


router.get('/', function(req,res) {
    console.log("/ called");
    res.sendFile(path.join(__dirname ,'../views/login.html'));
});

router.get('/subjects', function(req,res) {
    if(req.body.type == "student") {
        let std_class = req.body.class ;
        let std_sec = req.body.sec ;
        let query = "SELECT Subjects.name , Subjects.course_code " + 
                    "FROM Subjects" +
                    "INNER JOIN  Subject_alloted" +
                    "ON Subjects.course_code = Subject_alloted.course_code AND " +
                    "Subject_alloted.class = $1 AND Subject_alloted.sec = $2"; 
                    /* operator does not exist: "char"[] = text 
                     ON Subject.course_code = Subject_alloted...*/

        pool.query(query , function(res,err) {

            if(err) {
                console.log("Error in /select ", err);
                res.status(400).send(err);
            }
            res.setHeader('content-type', 'application/json');
            res.status(200).send(results.rows);
        });
    }
});

router.post('/login',function(req,res) {
    console.log("/login called");
    let username = req.body.username;
	let password = req.body.password; 
	if (username && password) {
    pool.query('SELECT * FROM teacher WHERE id = $1 AND password = $2', [username,password], 
    function(error, results) {
      if(error) {
        console.log("error ocurred",error);
      }
      console.log(results);
			if (results.rowCount > 0) {
                const token = jwt.sign({role : 'teacher'}, secret , {algorithm : 'HS256'});
                console.log("TOKEN"+token); 
                res.status(200).json({token})
				//res.redirect('/assignmentPage');
			} else {
                pool.query('SELECT * FROM student WHERE regno = ? AND password = ?', [username,password],
                function(error , results) {
                    if(error) {
                        console.log("Error ocurred", error);
                    }
                    if(results.rowCount > 0) {
                        generateJwtToken('student');
                        res.redirect('/assignmentPage');
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