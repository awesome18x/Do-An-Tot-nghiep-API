const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                username: req.body.username,
                khoaphong: req.body.khoaphong,
                hoten: req.body.hoten,
                hocvi: req.body.hocvi,
                CCHN: req.body.CCHN,
                createdAt: new Date(),
                active: req.body.active,
                password: hash
            });
            user.save()
                .then(result => {
                    res.status(200).json({
                        message: 'User created!',
                        result: {
                            _id: result._id,
                            username: result.username,
                            hoten: result.hoten,
                            khoaphong: result.khoaphong,
                            CCHN: result.CCHN,
                            createdAt: result.createdAt
                        }
                    });
                }).catch(err => {
                    res.status(500).json({
                        error: err
                    });
                    console.log(error);
                });
        });

})

router.post('/login', (req, res, next) => {
    let fetchedUser;
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            let user = User.findOne({ username: req.body.username })
                .then(user => {
                    if (!user) {
                        res.status(401).json({
                            message: 'Auth failed!'
                        })
                    }
                    fetchedUser = user;
                    return bcrypt.compare(req.body.password, fetchedUser.password);
                })
                .then(result => {
                    if (!result) {
                        res.status(401).json({
                            message: 'Auth failed!'
                        })
                    }
                    const token = jwt.sign({ username: fetchedUser.username, userId: fetchedUser._id },
                        'secret_this_should_be_longer', { expiresIn: '1h' }
                    );
                    res.status(200).json({
                        token: token,
                        expiresIn: 3600,
                        user: {
                            _id: fetchedUser._id,
                            hoten: fetchedUser.hoten,
                            khoaphong: fetchedUser.khoaphong,
                            CCHN: fetchedUser.CCHN,
                            hocvi: fetchedUser.hocvi
                        }
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(401).json({
                        message: 'Auth failed!'
                    })
                })
        })
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    User.findById({ _id: id })
        .exec()
        .then(person => {
            res.status(201).json({
                msg: `Da tim thay 1 person voi id: ${id}`,
                user: person
            });
        })
        .catch(error => {
            res.status(500).json({
                msg: 'Have a error'
            });
        });
});

router.post('/reset-password/:id', (req, res, next) => {
    const id = req.params.id;
    bcrypt.hash(req.body.oldPassword, 10)
        .then(result => {
            let user = User.findById({ _id: id })
                .then(user => {
                    if (!user) {
                        res.status(401).json({
                            message: 'No find account'
                        })
                    }
                    fetchedUser = user;
                    console.log(user);
                    return bcrypt.compare(result, fetchedUser.password);
                })
                .then(result => {
                    // if (!result) {
                    //     return res.status(401).json({
                    //         message: 'Auth failed!'
                    //     })
                    // }
                    return bcrypt.hash(req.body.newPassword, 10);
                })
                .then(hash => {
                    User.findOneAndUpdate({ _id: id }, { password: hash })
                        .then(result => {
                            res.status(200).json(result);
                        }).catch(error => {
                            console.log(error);
                        });
                }).catch(error => {
                    console.log(error);
                });

        })
});

router.get('/getall', (req, res, next) => {
    User
        .find()
        .populate('khoaphong')
        .sort('khoaphong')
        .then(results => {
            console.log(results);
            if (!results) {
                res.status(500).json({
                    msg: 'Have a error'
                });
            }
            res.status(200).json({
                msg: 'Lay du lieu thanh cong',
                count: results.length,
                user: results.map(hxt => {
                    return {
                        _id: hxt._id,
                        hoten: hxt.hoten,
                        khoaphong: hxt.khoaphong,
                        active: hxt.active,
                        username: hxt.username
                    }
                })
            });
        })
        .catch(error => {
            res.status(500).json(error);
            console.log(error);
        });
});

module.exports = router;