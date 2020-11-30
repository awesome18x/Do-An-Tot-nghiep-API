const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dmICDSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    ma: {
        type: String,
        required: true,
        unique: true
    },
    nhom: {
        type: String
    },
    chuong: {
        type: String
    }
    
});

module.exports = mongoose.model('DMICD', dmICDSchema);