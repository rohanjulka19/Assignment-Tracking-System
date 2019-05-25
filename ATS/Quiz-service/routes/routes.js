const express = require('express');
const router = express.Router() ;
const pool = require('../models/model');
const middleware = require('../middleware');
const path = require('path');

router.get('/' , (req,res) => {
    console.log("/ called");
    res.redirect('/quiz');
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
    const token = req.body.token ; 
    if(middleware.getUserRole(token) == 'teacher') {
        let query = 'SELECT * FROM Quiz WHERE teacher_id = $1 AND subject_course_code = $2';
        pool.query(query, [middleware.getUserName(token), req.params.subject] , (err,results) => {
            if(err) {
                console.log("Error at /subject/quiz/ teacher Read");
            }

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
    const token = req.body.token ; 
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
    const token = req.body.token ; 
    if(middleware.getUserRole(token) == 'teacher') {
        let query = '';
        pool.query(query, [] , (err,results) => {
            if(err) {
                console.log("Error at /quiz/id teacher Delete");
            }
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


router.get('/quiz/:id/submissions' , (req,res) => {
    console.log("/quiz/id/submissons called Read");
    const token = req.body.token ; 
    if(middleware.getUserRole(token) == 'teacher') {
        let query = '';
        pool.query(query, [] , (err,results) => {
            if(err) {
                console.log("Error at /quiz/id/submissions teacher Read");
            }
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
        let query = '';
        pool.query(query, [] , (err,results) => {
            if(err) {
                console.log("Error at /quiz/id/submission student Insertion");
            }
        });
    }
});




module.exports = router ;