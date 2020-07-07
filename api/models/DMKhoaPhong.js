const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dmKhoaPhongSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    // createdBy: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    type: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('DMKhoaPhong', dmKhoaPhongSchema);