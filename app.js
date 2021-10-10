const express = require('express');
const mongoose = require('mongoose');

const index = require('./routes/index');
const users = require('./routes/users');

//Connecting  to Database using Mongoose

//mongoose.connect('mongodb://localhost:27017/crudder'); While using local MongoDB Port on your device
mongoose.connect('mongodb+srv://user1:987654321@cluster0.vilnc.mongodb.net/crudder?retryWrites=true&w=majority'); // Using A MongoDB Atlas. Cluster
             
const db = mongoose.connection;

db.on('connected', ()=>{
    //Displaying a message when Database is connected Successfully
    console.log('Connected to Database');

});

db.on('error', ()=>{
    console.log('Database Error');
    //Database Error Message
});

const app = express(); // Initializing the express App
/*
app.get('/', (req, res)=>{
    res.send('Hello World!');
});
*/


//Setting Up View Engine
app.set('view engine', 'ejs');
app.set('views', 'views');

//Express JSON Format. URL Encoded
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

//Adding Two simple routes form express router
app.use('/', index);
app.use('/users', users);


//Adding the Process Environment Port or  Port 3000  as default
const PORT = process.env.PORT || 3000;

//App is going to listen Port 3000
app.listen(PORT, ()=>{
    console.log(`App Started on ${PORT}`);
});


