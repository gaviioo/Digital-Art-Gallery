const express = require('express');
const router = express.Router();
const Artwork = require('../models/Artwork'); // Make sure this path is correct

// Test route to confirm the route is working
router.get('/', (req, res) => {
    res.send('Artwork API is working!');
});

// Get all artworks
router.get('/artworks', async (req, res) => {
    try {
        const artworks = await Artwork.find();
        res.json(artworks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single artwork by ID
router.get('/artworks/:id', async (req, res) => {
    try {
        const artwork = await Artwork.findById(req.params.id);
        if (!artwork) return res.status(404).json({ message: 'Artwork not found' });
        res.json(artwork);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new artwork
router.post('/artworks', async (req, res) => {
    const artwork = new Artwork({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        artist: req.body.artist
    });

    try {
        const newArtwork = await artwork.save();
        res.status(201).json(newArtwork);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update an artwork by ID
router.put('/artworks/:id', async (req, res) => {
    try {
        const artwork = await Artwork.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!artwork) return res.status(404).json({ message: 'Artwork not found' });
        res.json(artwork);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete an artwork by ID
router.delete('/artworks/:id', async (req, res) => {
    try {
        const artwork = await Artwork.findByIdAndDelete(req.params.id);
        if (!artwork) return res.status(404).json({ message: 'Artwork not found' });
        res.json({ message: 'Artwork deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
