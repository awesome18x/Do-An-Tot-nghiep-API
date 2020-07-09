const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const phieukhamSchema = new Schema({
    _id: Schema.Types.ObjectId,

    ngayKham: {
        type: Date,
        required: true
    },
    bacSyKham: {

    }

});

module.exports = mongoose.model('HSPhieuKham', phieukhamSchema);