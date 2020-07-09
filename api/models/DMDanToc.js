const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dmDanTocSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        unique: true,
    },
    ma: {
        type: Number,
        required: true,
        unique: true
    },
    STT: {
        type: Number,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('DMDanToc', dmDanTocSchema);