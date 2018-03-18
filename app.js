// import modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// database route
const db = 'mongodb://sachin729:sachin729@ds157677.mlab.com:57677/meanauthenticationapp';
mongoose.Promise = global.Promise;

// connecting to database
mongoose.connect(db, (err)=>{
    if(err){
        console.log('error in database connection');
    }
    else{
        console.log('connected to database successfully');
    }
});

// router file
const route = require('./routes/route');

// port number
//const port = process.env.PORT || 8080;
const port = 3000;

// assigning express function
const app = express();

// core middleware
app.use(cors());

// body-parser middleware
app.use(bodyParser.json());

// router middleware
app.use('/api', route);

// static files
app.use(express.static(path.join(__dirname, '/public')));

//index route
// app.get('/', (req, res)=>{
//     res.send('Invalid endpoint');
// });

// app.get('*', (req, res)=>{
//     res.sendFile(path.join(__dirname, 'public/index.html'));
// });

// starting the server
app.listen(port, ()=>{
    console.log('server started at port :' + port);
});