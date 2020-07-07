const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const app = express();


// import router
// const postRoute = require('./routes/post');
const userRoute = require('./api/routers/user');
const dmKhoaPhongRoute = require('./api/routers/dmKhoaPhong');
//connect mongodb
mongoose.connect('mongodb://localhost:27017/Do-an-tn', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        console.log('Connected to database.')
    })
    .catch(() => {
        console.log('Connected failed!')
    });
// import middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use('/images', express.static(path.join('images')));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    next();
});

// app.use('/api/posts', postRoute);
app.use('/api/user', userRoute);
app.use('/api/dmkhoaphong', dmKhoaPhongRoute);


module.exports = app;