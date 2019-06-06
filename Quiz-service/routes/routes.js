const express = require('express');
const router = express.Router() ;
const pool = require('../models/model');
const middleware = require('../middleware');
const path = require('path');
const axios = require('axios');

router.get('/' , (req,res) => {
    console.log("/ called");
    res.redirect('/quiz');
});

router.get('/subjects', (req,res) => {
    console.log('/subjects called');
    const token = req.cookies.auth ;
    let role = middleware.getUserRole(token);
    let user = middleware.getUserName(token);
    if(role == 'teacher') {
        console.log('User is teacher');
        axios.get('http://localhost:3000/subjects?type=teacher&teacher_id=101')
        .then((response) => {
            res.json(response.data);
        })
        .catch((err) => console.log( err));
    }
});

router.get('/quiz' , (req,res) => {
    console.log("/quiz  called");
    const token = req.cookies.auth ;
    console.log(token)
    let role = middleware.getUserRole(token);
    console.log(role);
    if(role == 'teacher') {
        console.log('User is teacher');
        /*let query = '';
        pool.query(query, [] , (err,results) => {
            if(err) {
                console.log("Error at /quizPage teacher Read");
            }
        });*/
        res.sendFile(path.join(__dirname , '../views/Quiz.html')); 
       
    } else {
        let query = '';
        pool.query(query, [] , (err,results) => {
            if(err) {       
                console.log("Error at /quizPage student Read");
            }
        });
    }
});

router.get('/:subject/quiz' , (req,res) => {
    console.log("/subject/quiz/ called");
    const token = req.cookies.auth; 
    let role = middleware.getUserRole(token);
    let user = middleware.getUserName(token);
    
    console.log(req.params.subject);
    if(role == 'teacher') {
        let query = 'SELECT * FROM Quiz WHERE teacher_id = $1 AND subject_course_code = $2';
        pool.query(query, [user, req.params.subject] , (err,results) => {
            if(err) {
                console.log("Error at /subject/quiz/ teacher Read" + err);
            }
            //console.log("results"+results.rows);
            res.json(results.rows);
        });
    } else {
        let query = '';
        pool.query(query, [] , (err,results) => {
            if(err) {
                console.log("Error at /subject/quiz/ student Read");
            }
        });
    }
});

router.get('/quiz/:id' , (req,res) => {
    console.log("/quiz/id called Read");
    const token = req.cookies.auth; 
    let role = middleware.getUserRole(token);
    let user = middleware.getUserName(token);

    if(middleware.getUserRole(token) == 'teacher') {
        let query = '';
        pool.query(query, [] , (err,results) => {
            if(err) {
                console.log("Error at /quiz/id teacher Read");
            }
        });
    } else {
        let query = '';
        pool.query(query, [] , (err,results) => {
            if(err) {
                console.log("Error at /quiz/id student Read");
            }
        });
    }
});


router.post('/quiz/:id' , (req,res) => {
    console.log("/quiz/id called Insertion");
    const token = req.body.token ; 
    if(middleware.getUserRole(token) == 'teacher') {
        let query = '';
        pool.query(query, [] , (err,results) => {
            if(err) {
                console.log("Error at /quiz/id teacher Insertion");
            }
        });
    } else {
        let query = '';
        pool.query(query, [] , (err,results) => {
            if(err) {
                console.log("Error at /quiz/id student Insertion");
            }
        });
    }
});

router.put('/quiz/:id' , (req,res) => {
    console.log("/quiz/id called Update ");
    const token = req.body.token ; 
    if(middleware.getUserRole(token) == 'teacher') {
        let query = '';
        pool.query(query, [] , (err,results) => {
            if(err) {
                console.log("Error at /quiz/id teacher Update");
            }
        });
    } else {
        let query = '';
        pool.query(query, [] , (err,results) => {
            if(err) {
                console.log("Error at /quiz/id student Update");
            }
        });
    }
});

router.delete('/quiz/:id' , (req,res) => {
    console.log("/quiz/id called Delete");
    const token = req.cookies.auth; 
    let role = middleware.getUserRole(token);
    //let user = middleware.getUserName(token);
    let id = req.params.id ;

    if(role === 'teacher') {
        let query = 'DELETE FROM Quiz WHERE id = $1 ';
        pool.query(query, [id] , (err,results) => {
            if(err) {
                console.log("Error at /quiz/id teacher Delete");
            }
            res.status(200).send();
        });
    } else {
        let query = '';
        pool.query(query, [] , (err,results) => {
            if(err) {
                console.log("Error at /quiz/id student Delete");
            }
        });
    }
});


router.get('/subm/quiz/:id' , (req,res) => {
    console.log("/quiz/id/submissons called Read");
    const token = req.cookies.auth; 
    let role = middleware.getUserRole(token);
    let id = req.params.id ;
    console.log(id);
    if(role == 'teacher') {
        let query = 'SELECT * FROM quiz_submissions WHERE quiz_id = $1' ;
        pool.query(query, [id] , (err,results) => {
            if(err) {
                console.log("Error at /quiz/id/submissions teacher Read");
            }
            console.log(results.rows);
            res.json(results.rows);
        });
    } else {
        let query = '';
        pool.query(query, [] , (err,results) => {
            if(err) {
                console.log("Error at /quiz/id/submissions student Read");
            }
        });
    }
});

router.get('/subm/subject/:subject' , (req,res) => {
    console.log("/quiz/id/submissons subjects called Read");
    const token = req.cookies.auth; 
    let role = middleware.getUserRole(token);
    let user = middleware.getUserName(token);
    let subCode = req.params.subject ;
    if(role == 'teacher') {
        let query = "SELECT a.std_regno , a.names , string_agg(a.marks,',') as quiz_marks "
                    + " FROM quiz_submissions as a inner join quiz on "
                    + " quiz.subject_course_code = $1 AND quiz.teacher_id = $2 AND "
                    +" a.quiz_id = quiz.id GROUP BY a.std_regno , a.names";
        pool.query(query, [subCode,user] , (err,results) => {
            if(err) {
                console.log("Error at /quiz/id/submissions teacher Read" + err);
            }
            console.log(results.rows);
            res.json(results.rows);
        });
    } else {
        let query = '';
        pool.query(query, [] , (err,results) => {
            if(err) {
                console.log("Error at /quiz/id/submissions student Read");
            }
        });
    }
});


router.post('/quiz/:id/submission' , (req,res) => {
    console.log("/quiz/id/submisson called Insertion");
    const token = req.body.token ; 
    if(middleware.getUserRole(token) == 'teacher') {
        let query = '';
        pool.query(query, [] , (err,results) => {
            if(err) {
                console.log("Error at /quiz/id/submission teacher Insertion");
            }
        });
    } else {
        let query = "SELECT names , std_regno , string_agg(marks,',') FROM quiz_submissions"
                    + "GROUP BY std_regno , names" ;
        pool.query(query, [] , (err,results) => {
            if(err) {
                console.log("Error at /quiz/id/submission student Insertion");
            }
        });
    }
});




module.exports = router ;