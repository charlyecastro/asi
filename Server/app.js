// Put interpreter into strict mode
"use strict";

// Imports 
const express = require('express');
const multer = require('multer');
const morgan = require("morgan");
const bodyParser = require("body-parser")
const ejs = require('ejs');
const path = require('path');
const mongoose = require("mongoose");
const Recipe = require("./models/recipe")

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
app.set('view engine', 'ejs');
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

// Initial route
app.get('/', (req, res) => res.render('index'))

// Upload route
app.post('/upload',upload.single('foodImg'), (req, res) => {
    const recipe = new Recipe({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        author: req.body.author,
        foodImg: req.file.path
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

// Server listening
app.listen(port,() => {
    console.log("server is running on port " + port); 
})