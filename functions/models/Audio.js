const mongoose = require('mongoose');
const { Schema } = mongoose;

const AudioSchema = new Schema({
    audioUrl: {
        type: String,
        required: true,
    },
    public_id: {
        type: String,
        required: true,
    },
    fileName: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('audios', AudioSchema);