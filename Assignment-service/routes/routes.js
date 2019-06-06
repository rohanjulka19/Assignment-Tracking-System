const express = require('express');
const router = require('router');
const middleware = require('../middleware');
const path = require('path');
const request = require('requests');
const pool = require('../models/model');

router.get('/', function(req,res) {
    res.redirect('/assignmentPage');
});

router.get('/assignmentPage' , (req,res) => {
    console.log('/assingmentPage called');
    token = req.body.token ;
    if(middleware.getTokenRole(token) == 'teacher' ) {
        res.sendFile(path.join(__dirname +'../views/teacher-portal.html'));
    }
    else {
        res.sendFile(path.join(__dirname + '../views/student-portal.html' ));
    }
});

route.get('/assignments', function(req,res) {
    console.log('/assignments called');
    let sub_codes = [] ;
    let sub_names = [] ;
    let token = req.body.token ;
    if(middleware.getTokenRole(token) == 'teacher') {
      
        let teacher_id = token.payload.teacher_id ;
        url = 'https://localhost:3000/subjects?type=teacher&teacher_id=' + teacher_id;
        request(url ,{json : true} , (err,res,body) => {
            if(err) {
                console.log("Error at /assignments teachers");
            }
            sub_codes = body.explanation.fields.subject_course_code ;
            sub_names = body.explanation.fields.name;

        });
    } else {
        let std_class = token.payload.class ;
        let std_sec = token.payload.sec ;
        url = 'https://localhost:3000/subjects?type=student&class=' + std_class + '&sec' + std_sec ;
        request(url,{json : true} , (err,res,body) => {
            if(err) {
                console.log("Error at /assignments Student") ;
            }
            sub_codes = body.explanation.fields.subject_course_code ;
            sub_names = body.explanation.fields.name;
        });
    }
    let assignments = {
        name :'' ,
        issue_date:'',
        submission_date : '',

    } ;
    sub_codes.forEach((sub_code) => {
        let query = "SELECT name , issue_date , submission_date , assignment_url" +
                    "FROM Assignment";
        pool.query(query , (err,res) => {
            // Add Promise or Async code to fetch assignments for each subject course code 

        });
    }) ;   
    res.send({course_code: sub_codes , name : sub_names , assignments : assignments });
});

router.get('/:subject/submissions' , (req,res) => {
    console.log('/:subject/submissions called');
    let token = req.body.token ;
    let submissions = [] ;
    if(middleware.getTokenRole(token) == 'teacher') {
        let sub_code = req.params.subject;
        let query = "SELECT * FROM assignment_submissions" +
                    "WHERE subject_course_code = $1 ";
        pool.query(query,[sub_code],(err,results) => {
            if(err) {
                console.log("Error at /:subject/submissions teacher");
            }
            res.send(results.rows);
        });
    } else {
        let std_regno = token.payload.regno ;
        let query = "SELECT * FROM assignment_submissions" +
                    "WHERE subject_course_code = $1 ";
        pool.query(query,[std_regno],(err,results) => {
            if(err) {
                console.log("Error at /:subject/submissions students");
            }
            res.send(results.rows);
        });
    }
});

router.get('/assignment/:id', (req,res) => {
    console.log('/assignment/id called Read ');
    let token = req.body.token;
    let id = req.params.id;
    let query = "SELECT assignment_url FROM assignment " +
                "WHERE id = $1";
    pool.query(query,[id],(err,results) => {
        if(err) {
            console.log("Error at /assignment/id Read ");
        }
        res.send(results.rows);
    });
});

router.post('/assignment/:id', (req,res) => {
    console.log('/assignment/id called Create ');
    let token = req.body.token;
    if(middleware.getTokenRole(token) == 'teacher') {
        let id = req.params.id ;
        let name = req.body.name ;
        let sub_code = req.body.sub_code ;
        let teacher_id = token.payload.teacher_id;
        let issue_date = req.body.issue_date;
        let submission_date = req.body.submission_date;
        let t_class = req.body.class ;
        let t_sec = req.body.sec ;
        // ASSIGNMENT URL 

        let query = "INSERT INTO assignment(id , name , subject_course_code"+
                    ",teacher_id,issue_date,submission_date" +
                    ",class,sec,assignment_url)" +
                    "values ($1,$2,$3,$4,$5,$6,$7,$8) " ;

        pool.query(query , [id,name,sub_code,teacher_id,issue_date,submission_date,t_class,t_sec],
                    (err,results) => {
                        if(err) {
                            console.log("Error at /assignment/id/ Insertion");
                        }
                        res.status(200).send();
                    });
    }
});

router.update('/assignment/:id', (req,res) => {
    console.log('/assignment/id called Update');
    let token = req.body.token;
    if(middleware.getTokenRole(token) == 'teacher') {
        let id = req.params.id ;
        let name = req.body.name ;
        let sub_code = req.body.sub_code ;
        let teacher_id = token.payload.teacher_id;
        let issue_date = req.body.issue_date;
        let submission_date = req.body.submission_date;
        let t_class = req.body.class ;
        let t_sec = req.body.sec ;

        let query = "UPDATE assignment" +
                    "SET id = $1 , name = $2 , sub_code = $3 , teacher_id = $4," +
                    "issue_date = $5 , submission_date = $6 , t_class = $7 , t_sec = $8" ;
        // ADD ASSIGNMENT URL

        pool.query(query , (err,results) => {
            if(err) {
                console.log("Error at /assignment/id Update");
            }
            res.status(200).send();
        });
    }
});

router.delete('/assignment/:id', (req,res) => {
    console.log('/assignment/id called Delete ');
    let token = req.body.token;
    if(middleware.getTokenRole(token) == 'teacher') {
        let id = req.params.id ;
        let query = "DELETE FROM assignment" +
                    "WHERE id = $1" ;
        pool.query(query , (err,results) => {
            if(err) {
                console.log("Error at /assignment/id Delete");
            }
            res.status(200).send();
        });
    }
});

router.get('/assignment/:id/submissions', (req,res) => {
    console.log('/assignment/id/submissions called Read');
    let token = req.body.token;
    if(middleware.getTokenRole(token) == 'teacher') {
        let id = req.params.id ;
        
        let query = "SELECT student_regno , marks , submission_url" +
                    "FROM assignment_submissions"+
                    "WHERE assignment_id = $1";
        pool.query(query,[id], (err,results) => {
            if(err) {
                console.log("Error at /assignment/id/submission Read teacher") ;
            }
            res.send(results.rows);
        });
    } else {
        let std_reg = token.payload.regno ;
        
        let query = "SELECT marks , submission_url " +
                    "FROM assignment_submissions" +
                    "WHERE assignment_id = $1" ;
        pool.query(query,[std_reg], (err,results) => {
            if(err) {
                console.log(" Error at /assignment/id/submissions Read student") ;
            }
            res.send(results.rows);
        });
    }
});

router.update('/assignment/:id/submissions' , (req,res) => {
    console.log("/assignment/:id/submissions called Update");
    let token = req.body.token;
if(middleware.getTokenRole(token) == 'teacher') {
    let id = req.params.id ;
    let std_reg = req.body.regno ;
    let marks = req.body.marks ;
    let index = 0 ;
    std_reg.forEach((regno) => {
        let query = "UPDATE assignment_submissions" + 
                    "SET marks = $1" +
                    "WHERE assignment_id = $2 AND student_regno = $3 " ;
        // ADD ASYNC HERE
        pool.query(query,[marks[index],id , std_reg] , (err,results) => {
            if(err) {
                console.log(" Error at /assignment/id/submissions Update teacher") ;
            }
            res.status(200).send();
        });
    }) ;
    
} else {
    let id = req.params.id ;
    let std_reg = req.body.regno ;
    
    let query = "UPDATE assignment_submissions" + 
                "SET submission_url = $1" +
                "WHERE assignment_id = $2 AND student_regno = $3 " ;
    // ADD ASYNC HERE   // ASSIGNMENT SUBMISSION URL
    pool.query(query,[url,id , std_reg] , (err,results) => {
        if(err) {
            console.log(" Error at /assignment/id/submissions Update student") ;
        }
        res.status(200).send();
    });

}
});

router.post('/assignment/:id/submission' , (req,res) => {
    console.log(" /assignment/id/submission called Update ") ;
    let token = req.body.token;
    if(middleware.getTokenRole(token) == 'student') {
        let id = req.body.id ;
        let std_regno = token.payload.regno;
        let url = req.body.url ;

        
        let query = "INSERT INTO assignment_submission(assignment_id , student_regno"+
                    "submission_url)"+
                    "values ($1,$2,$3) " ;
        pool.query(query,[url,id , std_reg] , (err,results) => {
            if(err) {
                        console.log(" Error at /assignment/id/submissions Insertion student") ;
                    }
            res.status(200).send();
        });
    } 
});
