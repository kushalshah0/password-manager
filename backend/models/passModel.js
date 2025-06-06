const mongoose = require('mongoose');

const passSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    }
}, {
    timestamps: true,
});

const Pass = mongoose.model('Pass', passSchema);