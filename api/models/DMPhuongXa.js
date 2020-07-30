const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dmPhuongxa = new Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    path_with_type: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    parent_code: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('DMPhuongXa', dmPhuongxa);