const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
// const cors = require('cors')
const path = require('path');
const app = express();


// import router
const userRoute = require('./api/routers/user');
const dmKhoaPhongRoute = require('./api/routers/dmKhoaPhong');
const huonXuTriRoute = require('./api/routers/huongXuTri');
const danTocRoute = require('./api/routers/danToc');
const loaiKhamRoute = require('./api/routers/dmLoaiKham');
const hsPhieuKhamRoute = require('./api/routers/hsPhieuKham');
const dmBenhNhanRoute = require('./api/routers/dmBenhNhan');
const theBHYTRoute = require('./api/routers/theBHYT');







//connect mongodb
mongoose.connect('mongodb://localhost:27017/Do-an-tn', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        console.log('Connected to database.')
    })
    .catch(() => {
        console.log('Connected failed!')
    });
// import middleware
// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use('/images', express.static(path.join('images')));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
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

// Cấu hình router
app.use('/api/user', userRoute);
app.use('/api/dmkhoaphong', dmKhoaPhongRoute);
app.use('/api/huongxutri', huonXuTriRoute);
app.use('/api/dantoc', danTocRoute);
app.use('/api/dmloaikham', loaiKhamRoute);
app.use('/api/hsphieukham', hsPhieuKhamRoute);
app.use('/api/thebhyt', theBHYTRoute);
app.use('/api/dmbenhnhan', dmBenhNhanRoute);


module.exports = app;