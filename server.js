require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT

const multer = require('multer')
const upload = multer({dest:'public/'})

//Database Setting
const mongoose = require('mongoose')


//Database Creation
const mongoURI = process.env.MONGODBURI
const db = mongoose.connection

//Connecting mongo
mongoose.connect(mongoURI, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, ()=>{
    console.log("database connection checked...");
})

db.on('error', (err)=> { console.log('ERROR: ', err)});
db.on('connected', ()=> { console.log("mongo connected")})
db.on('disconnected', ()=> { console.log("mongo disconnected")})






app.post('/upload',upload.array('photos',10), (req,res)=>{
    res.send('Files Uploaded')
})


app.get('/',(req,res)=>{
    res.redirect('/home')
})


app.listen( PORT, ()=>{
    console.log('Server is ready to roll...');
})