const express = require('express');
const app = express() ;
const port = 3000 ;
const routes = require('./routes/routes');
//const conString = "postgres://Rohan:1234@localhost:5432/User";


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.get('/',routes);
app.post('/login' , routes);

app.listen(port, () => console.log("Listening"));


