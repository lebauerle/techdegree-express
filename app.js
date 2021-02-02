//variables to require the necessary dependencies
const express = require('express');
const app = express();
const {projects} = require('./data.json');


//set view engine to pug
app.set('view engine', 'pug'); 
const path = require('path')
//setting to static
app.use('/static', express.static(path.join(__dirname, 'public'))); 


/**Routing**/
// Home Page
app.get('/', (req, res) => {
    res.render('index', { projects });
});

//About Page
app.get('/about', (req, res) => {
    res.render('about');
});

//Page not found page
app.get('/page-not-found', (req, res) => {
    res.render('page-not-found');
});

//Error Page
app.get('/error', (req, res) => {
    res.render('error');
});

//Project Page
app.get('/project/:id', (req, res) => {
    const {id} = req.params;
    const project = projects[id];
    if (project){
        res.render('project', {project});
    } else {
        err.message = "I am sorry! That page doesn't exist!"
        res.redirect('./page-not-found');
    }  
});

/**Error Handling**/

//404 Error
app.use((res, req, next) => {
    const err = new Error();
    err.status = 404;
    err.message = "I am sorry! That page doesn't exist!";
    next(err);
});

//Global Error Handling
app.use((err, req, res, next) => {
    
    if (err.status === 404) {
        err.message = 'Sorry, The page could not be found!';
        res.status(404);
        res.render('page-not-found', { err });
        console.log(err.status + " Error: " + err.message);
    } else {
        err.status = err.status || 500;
        err.message = "I am sorry! Something went wrong!";
        res.status(500);
        res.render('error', { err });
        console.log(err.status + " Error: " + err.message);
    }
});


//app listen on port 3000
app.listen(3000, () => {
    console.log('App listening on port 3000: http://localhost:3000');
});