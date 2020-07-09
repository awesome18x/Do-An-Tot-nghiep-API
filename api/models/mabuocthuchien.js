const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mabuocSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    // createdBy: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
    type: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('MaBuocThucHien', mabuocSchema);