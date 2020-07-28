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
    },
    quan_huyen: [{
        type: Schema.Types.ObjectId,
        ref: 'DMQuanHuyen'
    }]

});

module.exports = mongoose.model('DMTinhThanh', dmTinhThanh);

quan_huyen: [{
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
}]