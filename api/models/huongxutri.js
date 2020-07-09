const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const huongXuTriSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    STT: {
        type: Number,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('HuongXuTri', huongXuTriSchema);