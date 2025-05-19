// server.js
const express = require('express');
const { initDb } = require('./db/connection');
require('dotenv').config();

// Import routes
const contactsRoutes = require('./routes/contacts');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Contacts API - CSE 341 Project');
});

// Routes
app.use('/contacts', contactsRoutes);

// Initialize database and start server
initDb((err) => {
  if (err) {
    console.error('Failed to connect to MongoDB:', err);
  } else {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
});
