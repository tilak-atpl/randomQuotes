const express = require('express');
const axios = require('axios');
const Quote = require('../models/Quote');

const router = express.Router();

 

// Save Favorite Quote
router.post('/favourites', async (req, res) => {
  try {
    const { content, author } = req.body;
    const quote = await Quote.create({ content, author });
    res.json(quote);
  } catch (error) {
    res.status(500).send('Error saving favorite quote');
  }
});

// Get Favorite Quotes
router.get('/favourites', async (req, res) => {
  try {
    const quotes = await Quote.findAll();
    res.json(quotes);
  } catch (error) {
    res.status(500).send('Error fetching favorite quotes');
  }
});

module.exports = router;
