const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    FULLNAME: {
        type: String,
        required: true
    },
    EMAIL: {
        type: String,
        required: true
    },
    PHONE: {
        type: String,
        required: true
    },
    FEE: {
        type: String,
        required: true
    },
    COURSE: {
        type: String,
        required: true
    },
    OUTSTANDING: {
        type: String,
        // required: true 
    }
}, {timestamps: true });

const Data = mongoose.model('Data', dataSchema);
module.exports = Data;