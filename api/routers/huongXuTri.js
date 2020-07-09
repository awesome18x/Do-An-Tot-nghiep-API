const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const HuongXuTri = require('./../models/huongxutri');

router.post('/create', (req, res, next) => {

    const huongxutri = new HuongXuTri({
        _id: new mongoose.Types.ObjectId,
        STT: req.body.STT,
        name: req.body.name
    });

    huongxutri.save()
        .then(hxt => {
            res.status(201).json({
                msg: 'Created huong xu tri thanh cong',
                hxt: hxt
            });
        })
        .catch(error => {
            res.status(500).json({
                msg: 'Have a error'
            });
        });
});

router.get('/', (req, res, next) => {

    HuongXuTri
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
                hxt: results.map(hxt => {
                    return {
                        _id: hxt._id,
                        name: hxt.name,
                        STT: hxt.STT
                    }
                })
            });
        })
        .catch(error => {
            console.log(error);
        });

});



module.exports = router;