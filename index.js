const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const artworkRoutes = require('./routes/artworkRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/artworks', artworkRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((error) => console.error('❌ MongoDB Connection Error:', error));

// Start the server
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
