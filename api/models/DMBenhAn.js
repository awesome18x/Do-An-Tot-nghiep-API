const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dmBenhAnSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        unique: true,
    },
    ma: {
        type: Number,
    }
});

module.exports = mongoose.model('DMBenhAn', dmBenhAnSchema);