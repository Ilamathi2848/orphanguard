require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// ROUTES (Correct & Clean)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/feedback', require('./routes/feedback'));
app.use('/api/donation', require('./routes/donation'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/volunteer', require('./routes/volunteer'));   // KEEP ONLY THIS
app.use('/api/orphanages', require('./routes/orphanages')); // THIS IS THE CORRECT FILE
app.use('/api/seed', require('./routes/seed'));

// Seed route
app.use('/api/seed', require('./routes/seed')); // use ONLY this seed.js inside routes

// Home
app.get("/", (req, res) => {
    res.send("API is running...");
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ MongoDB Error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
