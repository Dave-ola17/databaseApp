const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    item: {
        type: String,
        required: true
    },
    discription: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    total: {
        type: String,
        required: true
    }   
}, {timestamps: true });

const Data2 = mongoose.model('Data2', dataSchema);
module.exports = Data2;