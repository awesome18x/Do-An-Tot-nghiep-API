const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dmQuanhuyen = new Schema({
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
    },
    xa_phuong: [{
        type: Schema.Types.ObjectId,
        ref: 'DMXaPhuong'
    }]

});

module.exports = mongoose.model('DMQuanHuyen', dmQuanhuyen);



xa_phuong: [{
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
}]