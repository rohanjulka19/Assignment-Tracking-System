const express = require('express')
const mysql = require('mysql')
const app = express();
const path = require('path');
const bodyParser = require('body-parser');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'data'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/views/login.html'));
});

app.post('/login', function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	if (username && password) {
    connection.query('SELECT * FROM teacher WHERE id = ? AND password = ?', [username, password], 
    function(error, results, fields) {
      if(error) {
        console.log("error ocurred",error);
      }
			if (results.length > 0) {
				//request.session.loggedin = true;
				//request.session.username = username;
				res.redirect('/assignmentpage');
			} else {
        res.send('Incorrect Username and/or Password!');
			}			
			res.end();
		});
	} else {
    //response.send('Please enter Username and Password!');
    //alert("Please Enter Username and Password");
		res.redirect('/');
	}
});

app.get('/assignmentpage', function(req,res) {
  res.sendFile(path.join(__dirname + '/views/teacher-portal.html'))
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});