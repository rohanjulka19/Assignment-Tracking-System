const express = require('express');
const app = express();
const port = 3002 ;
const bodyParser = require('body-parser');
const router = require('./routes/routes');
const cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(cookieParser());
app.use(router);


app.listen(port, ()=>console.log("Listening on 3002"));