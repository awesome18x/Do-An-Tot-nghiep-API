const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dmxaphuong = new Schema({
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
    name_with_type: {
        type: String,
        required: true
    },
    path: {
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

module.exports = mongoose.model('DMXaPhuong', dmxaphuong);