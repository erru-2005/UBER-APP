const mongoose = require("mongoose");

const BlacklistedTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '2d', // Token will automatically be removed after 2 days
    },
});

const BlacklistedToken = mongoose.model("BlacklistedToken", BlacklistedTokenSchema);

module.exports = BlacklistedToken;