const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const HSChiDinhDVKT = require('./../models/HSChiDinhDVKT');

router.post('/create', async(req, res, next) => {
    const hschidinhdvkt = new HSChiDinhDVKT({
        _id: new mongoose.Types.ObjectId,
        idPhieuKham: req.body.idPhieuKham,
        idBenhAn: req.body.idBenhAn,
        idDVKT: req.body.idDVKT,
        TenDVKT: req.body.TenDVKT,
        MaDVKT: req.body.MaDVKT,
        SoLuong: req.body.SoLuong,
        NgayYLenh: req.body.NgayYLenh,
        NgayTao: req.body.NgayTao,
        NguoiTao: req.body.NguoiTao,
        TrangThai: req.body.TrangThai,
        GhiChu: req.body.GhiChu,
        IsBHYT: req.body.IsBHYT, 
        KetQua: req.body.KetQua
    });

    hschidinhdvkt.save()
        .then(result => {
            res.status(201).json({
                HSChiDinhDVKT: result
            });
        })
        .catch(error => {
            res.status(500).json({
                msg: 'Have a error'
            });
            console.log(error);
        });
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    HSChiDinhDVKT
        .find({ idPhieuKham: id})
        .populate('idDVKT NguoiTao')
        .exec()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => {
            console.log(error);
        })
         
    
});



router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const updateOps = {};
    Object.assign(updateOps, req.body)
        // console.log(Object.keys(req.body));
    for (const key in req.body) {
        updateOps[key] = key.value;
    }
    console.log(updateOps);
    // HSPhieuKham.findByIdAndUpdate(id, updateOps).exec((err, data) => {
    //     console.log("error:", err, data);

    //     res.status(200).json({
    //         msg: 'Update HSPhieuKham thanh cong',
    //         HSPhieuKham: data
    //     })
    // })

    HSChiDinhDVKT.update({ _id: id }, updateOps)
        // .exec()
        .then(result => {
            res.status(200).json({
                msg: 'Update HSChiDinhDVKT thanh cong',
                HSPhieuKham: result
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                msg: 'Have a error'
            });
        });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    HSChiDinhDVKT.findByIdAndDelete({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                HSPhieuKham: result
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                msg: 'Have a error'
            });
        });
})



module.exports = router;
