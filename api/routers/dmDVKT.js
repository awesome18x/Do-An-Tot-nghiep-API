const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const DMDVKT = require('./../models/DMDVKT');

router.post('/create', (req, res, next) => {

    const dvkt = new DMDVKT({
        _id: new mongoose.Types.ObjectId,
        Name: req.body.name,
        MaDV: req.body.madv,
        Type: +req.body.type,
        active: req.body.active,
        GiaDV: req.body.giadv,
        GiaBH: req.body.giabh,
        BuongThucHien: req.body.buongthuchien,
        KhoaThucHien: req.body.khoathuchien
    });

    dvkt.save()
        .then(dvkt => {
            res.status(201).json({
                msg: 'Created dvkt thanh cong',
                dvkt: dvkt
            });
        })
        .catch(error => {
            res.status(500).json({
                msg: 'Have a error'
            });
            console.log(error);
        });
});

router.get('/', (req, res, next) => {
    const type = +req.query.type;
    const pageSize = +req.query.pageSize;
    const pageIndex = +req.query.pageIndex;
    let dantocQuery;
    let dantocFetched;
    if (type != 0) {
        dantocQuery = DMDVKT.find({ Type: type }).skip(pageSize * (pageIndex - 1)).limit(pageSize);
    } else {
        dantocQuery = DMDVKT.find().skip(pageSize * (pageIndex - 1)).limit(pageSize);
    }

    dantocQuery
        .exec()
        .then(results => {
            if (!results) {
                res.status(500).json({
                    msg: 'Have a error'
                });
            }
            dantocFetched = results;
            if (type != 0) {
                return DMDVKT.countDocuments({ Type: type });
            } else {
                return DMDVKT.countDocuments();
            }

        }).then(count => {
            res.status(200).json({
                msg: 'Lay du lieu thanh cong',
                count: count,
                dvkt: dantocFetched
            });
        })
        .catch(error => {
            console.log(error);
        });

});
//lấy công khám theo buồng khám

router.get('/:idbuongkham', (req, res, next) => {
    const id = req.params.idbuongkham;
    DMDVKT.find({ Type: 1, BuongThucHien: { $in: id } })
        .exec()
        .then(dvkt => {
            res.status(201).json(dvkt);
        })
        .catch(error => {
            res.status(500).json({
                msg: 'Have a error'
            });
        });

});

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    DMDVKT.findByIdAndDelete({ _id: id })
        .exec()
        .then(khoaphong => {
            if (!khoaphong) {
                res.status(500).json({
                    msg: `Co loi xay ra khi xoa 1 dvkt voi id: ${id}`,
                    dvkt: khoaphong
                });
            }
            res.status(201).json({
                msg: `Da xoa 1 dvkt voi id: ${id}`,
                dantoc: khoaphong
            });
        })
        .catch(error => {
            res.status(500).json({
                msg: 'Have a error'
            });
        });
});

router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    // const dvkt = new DMDVKT({
    //     _id: new mongoose.Types.ObjectId,
    //     Name: req.body.name,
    //     MaDV: req.body.madv,
    //     Type: +req.body.type,
    //     active: req.body.active,
    //     GiaDV: req.body.giadv,
    //     GiaBH: req.body.giabh,
    //     BuongThucHien: req.body.buongthuchien,
    //     KhoaThucHien: req.body.khoathuchien
    // });
    console.log(req.body);

    DMDVKT.findOneAndUpdate({ _id: id }, {
        $set: {
            Name: req.body.name,
            MaDV: req.body.madv,
            Type: +req.body.type,
            active: req.body.active,
            GiaDV: req.body.giadv,
            GiaBH: req.body.giabh,
            BuongThucHien: req.body.buongthuchien,
            KhoaThucHien: req.body.khoathuchien
        }
    },{
        upsert: true
    })
        .exec()
        .then(dvkt => {
            res.status(201).json({
                msg: `Da update 1 DVKT voi id: ${id}`,
                DMDVKT: dvkt
            });
        })
        .catch(error => {
            res.status(500).json({
                msg: 'Have a error'
            });
        });
});


router.get('/chitietdvkt/:id', (req, res) => {
    let idDVKT = req.params.id;
    DMDVKT.findById({_id: idDVKT})
    .populate('BuongThucHien KhoaThucHien')
        .exec()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => {
            res.status(400).json(error);
        })
})





module.exports = router;