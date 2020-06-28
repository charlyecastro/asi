// Put interpreter into strict mode
"use strict";

// Imports 
const express = require('express');
const multer = require('multer');
const morgan = require("morgan");
const bodyParser = require("body-parser")
const path = require('path');
const mongoose = require("mongoose");
const Recipe = require("./models/recipe")
const passport = require('passport')
const cookieSession = require('cookie-session')
const cookieParser = require("cookie-parser");

require('./passport/google-setup');

// Set multer storage
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() +
        path.extname(file.originalname));
    }
}); 

// Init multer uploads
const upload = multer({
    storage: storage,
    limits: 1024 * 1024 * 5,
    fileFilter: function(req ,file ,cb) {
        checkFileType(file, cb);
    }
})
//.single('foodImage');

// Fetch environment variables
const addr = process.env.MESSAGESADDR || ":80";
const mongoAddr = process.env.MONGOADDR;
const [host, port] = addr.split(":");

// Set up mongo url and connect to database
const url = "mongodb://" + mongoAddr + "/cookbook"

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => { console.log("Connected to database!") })
    .catch((err) => { console.log("couldnt connect to database because of ERR: ", err) })

// Init app and use middlewares
const app = express();
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieSession({ 
    name: "session",
    keys: ["thisappisawesome"],
    maxAge: 24 * 60 * 60 * 100
}))

app.use(cookieParser())

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Credentials", "true")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// Check file type
function checkFileType(file, cb) {
    // allow extensions
    const fileTypes = /jpeg|jpg|png|gif/;

    // check extensions
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

    // check mime
    const mimeType = fileTypes.test(file.mimetype);

    if (mimeType && extName) {
        return cb(null, true);
    } else {
        cb('Error: Images Only.');
    }
}

// Get all recipes
app.get('/recipes', (req, res) => {
    // console.log(req.user)
    Recipe.find()
    .exec()
    .then(docs => {
        console.log(docs)
        res.status(200).json(docs);
    })
})

app.get('/recipes/:slug', (req, res) => {
    let recipeID = req.params.slug
    Recipe.findOne({_id: recipeID})
    .exec()
    .then(doc => {
        console.log(doc)
        res.status(200).json(doc);
    })
    .catch((err) => {
        console.log(err)
        res.status(500)
    })
})

// Upload recipe
app.post('/upload',upload.single('foodImg'), (req, res) => {
    console.log(req)
    console.log(req.body)
    const recipe = new Recipe({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        private: req.body.private,
        members: [],
        ingredients: JSON.parse(req.body.ingredients),
        directions: [],
        author: req.body.author,
        foodImg: req.file.path,
        createdAt: new Date().getTime(),
    })
    recipe.save()
    .then(result => {
        console.log(result)
    })
    .catch(err => {
        console.log(err)
    })
    res.status(201).json({
        recipe
    })
});

app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:3000');
  }
);

app.listen(port,() => {
    console.log("server is running on port " + port); 
})