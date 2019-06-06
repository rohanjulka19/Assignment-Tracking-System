const express = require('express');
const app = express();
const port = 3001 ;
const bodyParse = require('body-parser');
const routes = require('./routes/routes');


app.use(express.static('public'));
app.use(bodyParse.urlEncoded({extended:true}));
app.get('/',routes);
app.post('/assignment',post);

app.listen(port,()=>console.log('listening'));