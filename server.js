const express = require('express');
const app = express() ;
const port = 3000 ;
const bodyParser = require('body-parser');
const router = require('./routes/routes');
//const conString = "postgres://Rohan:1234@localhost:5432/User";


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(router);

app.listen(port, () => console.log("Listening"));


