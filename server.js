/* =================================================== */
/* ===== Section 1: Require all the dependencies ===== */
/* =================================================== */

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: './uploads/' });
const hbs = require('hbs');
const logger = require('morgan');

// Define port for app to listen on
const port =  process.env.PORT || 8080;

/* ==================================================== */
/* ===== Section 2: Configure express middlewares ===== */
/* ==================================================== */

const app =  express();
app.use(bodyParser());  // to use bodyParser (for text/number data transfer between clientg and server)
app.set('view engine', 'hbs');  // setting hbs as the view engine
app.use(express.static(__dirname + '/public'));  // making ./public as the static directory
app.set('views', __dirname + '/views');  // making ./views as the views directory
app.use(logger('dev'));  // Creating a logger (using morgan)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


/* ==================================== */
/* ===== Section 3: Making Routes ===== */
/* ==================================== */

// GET / route for serving index.html file
app.get('/', (req, res) => {
    res.render('index.hbs');
});

// POST /upload for file upload
/* ===== Make sure that file name matches the name attribute in your html ===== */
app.post('/upload', upload.single('myFile'), (req, res) => {
    if (req.file) {
        console.log('Uploading file...');
        var filename = req.file.filename;
        var uploadStatus = 'File Uploaded Successfully';
    } else {
        console.log('No File Uploaded');
        var filename = 'FILE NOT UPLOADED';
        var uploadStatus = 'File Upload Failed';
    }
    
    /* ===== Add the function to save filename to database ===== */
    
    res.render('index.hbs', { status: uploadStatus, filename: `Name Of File: ${filename}` });
});

// GET /temp to render temp.hbs, for dev purposes
app.get('/temp', (req, res) => {
    res.render('temp.hbs');
});

// To make the server live
app.listen(port, () => {
    console.log(`App is live on port ${port}`);
});