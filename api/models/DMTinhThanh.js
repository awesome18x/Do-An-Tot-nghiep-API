const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dmTinhThanh = new Schema({
    _id: Schema.Types.ObjectId,
    code: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    name_with_type: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('DMTinhThanh', dmTinhThanh);