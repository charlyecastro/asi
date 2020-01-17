// imports
const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');

// set multer storage
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() +
        path.extname(file.originalname));
    }
}); 

// init multer uploads
const upload = multer({
    storage: storage,
    fileFilter: function(req ,file ,cb) {
        checkFileType(file, cb);
    }
}).single('foodImage');

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

// init app
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('./public'));

// initial route
app.get('/', (req, res) => res.render('index'))

// upload route
app.post('/upload', (req, res) => {
    upload(req,res, (err) => {
        if (err) {
            res.render('index', {
                msg: err
            })
        } else {
            console.log(req.file);
            res.send('test')
        }
    });
});

//server listening
const port = 3000;

app.listen(port,() => {
    console.log("server is running on port " + port); 
})
