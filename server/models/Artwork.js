const mongoose = require('mongoose');

const artworkSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    description: { type: String },
    year: { type: Number },
    imageUrl: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Artwork', artworkSchema);
