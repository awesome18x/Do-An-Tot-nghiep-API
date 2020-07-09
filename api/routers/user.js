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
                khoaPhong: req.body.khoaPhongId,
                hoTen: req.body.hoTen,
                hocVi: req.body.hocVi,
                CCHN: req.body.CCHN,
                password: hash
            });
            user.save()
                .then(result => {
                    res.status(200).json({
                        message: 'User created!',
                        result: result
                    });
                }).catch(err => {
                    res.status(500).json({
                        error: err
                    });
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
                        expiresIn: 3600
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

module.exports = router;