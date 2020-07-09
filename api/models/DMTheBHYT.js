const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dmBHYTSchema = new Schema({
    _id: Schema.Types.ObjectId,
    soTheBHYT: {
        type: String,
        required: true,
    },
    noiDKKCBBD: {
        type: String,
        required: true
    },
    hanDau: {
        type: Date,
        required: true
    },
    hanCuoi: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('DMTheBHYT', dmBHYTSchema);