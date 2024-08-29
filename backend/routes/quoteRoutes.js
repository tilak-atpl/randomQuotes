const express = require("express");
const axios = require("axios");
const Quote = require("../models/Quote");

const router = express.Router();

// Save Favorite Quote
router.post("/add/favourites", async (req, res) => {
  try {
    const { content, author } = req.body;
    const quote = await Quote.create({ content, author });
    res.json(quote);
  } catch (error) {
    res.status(500).send("Error saving favorite quote");
  }
});

// Get Favorite Quotes
router.get("/get/favourites", async (req, res) => {
  try {
    const quotes = await Quote.findAll();
    res.json(quotes);
  } catch (error) {
    res.status(500).send("Error fetching favorite quotes");
  }
});

router.delete("/delete/favourites", async (req, res) => {
  try {
    // Retrieve the quoteId from the query parameters
    const quoteId = req.query.quoteId;

    // Check if quoteId is provided
    if (!quoteId) {
      return res.status(400).json("quoteId is required.");
    }

    // Use the 'destroy' method with a condition to delete the specific record
    const result = await Quote.destroy({ where: { id: quoteId } });

    if (result) {
      res.json("Deleted successfully.");
    } else {
      res.status(404).json("Quote not found.");
    }
  } catch (error) {
    res.status(500).send("Error deleting favorite quote");
  }
});

module.exports = router;
