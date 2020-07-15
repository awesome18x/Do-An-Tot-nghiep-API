const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const LoaiKham = require('./../models/DMLoaiKham');

router.post('/create', (req, res, next) => {

    const loaikham = new LoaiKham({
        _id: new mongoose.Types.ObjectId,
        STT: req.body.STT,
        name: req.body.name,
        status: req.body.status
    });

    loaikham.save()
        .then(hxt => {
            res.status(201).json({
                msg: 'Created loai kham thanh cong',
                loaikham: hxt
            });
        })
        .catch(error => {
            res.status(500).json({
                msg: 'Have a error'
            });
        });
});

router.get('/', (req, res, next) => {

    LoaiKham
        .find()
        .sort('STT')
        .exec()
        .then(results => {
            if (!results) {
                res.status(500).json({
                    msg: 'Have a error'
                });
            }
            res.status(200).json({
                msg: 'Lay du lieu thanh cong',
                count: results.length,
                loaikham: results.map(hxt => {
                    return {
                        _id: hxt._id,
                        name: hxt.name,
                        STT: hxt.STT,
                        status: hxt.status
                    }
                })
            });
        })
        .catch(error => {
            console.log(error);
        });

});



module.exports = router;