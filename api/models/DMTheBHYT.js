const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dmBHYTSchema = new Schema({
    _id: Schema.Types.ObjectId,
    SoTheBHYT: {
        type: String,
    },
    NoiDKKCBBD: {
        type: String,
    },
    DiaChiTheoThe: {
        type: String
    },
    HanDau: {
        type: Date,
    },
    HanCuoi: {
        type: Date,
    },
    MaKhuVuc: {
        type: String
    }

});

module.exports = mongoose.model('DMTheBHYT', dmBHYTSchema);