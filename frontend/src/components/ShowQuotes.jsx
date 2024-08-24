import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Grid, IconButton } from "@mui/material";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import axios from "axios";
// Sample quotes data
const quotes = [
  {
    quote: "Code is like humor. When you have to explain it, it’s bad.",
    author: "Cory House",
  },
  {
    quote:
      "There are only two hard things in computer science: cache invalidation and naming things.",
    author: "Phil Karlton",
  },
  {
    quote:
      "Programming is the art of telling another human being what one wants the computer to do.",
    author: "Donald Knuth",
  },
  {
    quote: "Good code is its own best documentation.",
    author: "Steve McConnell",
  },
  {
    quote: "The best way to predict the future is to invent it.",
    author: "Alan Kay",
  },
  {
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    quote:
      "In theory, theory and practice are the same. In practice, they are not.",
    author: "Yogi Berra",
  },
  { quote: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  {
    quote: "Software is a great combination between artistry and engineering.",
    author: "Bill Gates",
  },
  { quote: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
];

export default function ShowQuotes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [data, setData] = useState()

  useEffect(() => {
    const addFavorites = async () => {
      try {
          const obj = {}
          obj.content = data.quote
          obj.author = data.author
          console.log("favorites[0]?.quote",favorites)
        await axios.post("http://127.0.0.1:3000/api/favourites", obj);
      } catch (error) {
        console.error("Error sending favorites to the server:", error);
      }
    };

    if (favorites.length > 0) {
      addFavorites();
    }
  }, [favorites]);
  // Handle search input changes
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Toggle favorite status of a quote
  const handleFavoriteToggle = (quote,element) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(quote)
        ? prevFavorites.filter((item) => item !== quote)
        : [...prevFavorites, quote]
    );
    setData(element)
  };

  // Check if a quote is in favorites
  const isFavorite = (quote) => favorites.includes(quote);

  // Filter quotes based on search term
  const filteredQuotes = quotes.filter(
    (quote) =>
      quote.quote.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      {/* Search Input */}
      <TextField
        label="Search Quotes"
        variant="outlined"
        fullWidth
        onChange={handleSearchChange}
        style={{ marginBottom: "20px" }}
      />

      {/* Display filtered quotes */}
      <Grid container spacing={4}>
        {filteredQuotes.length > 0 ? (
          filteredQuotes.map((element, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Box
                //  width="100%"
                p={2}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                sx={{
                  border: "2px solid #ddd",
                  borderRadius: "8px",
                  boxShadow: 2,
                  backgroundColor: "#fafafa",
                }}
              >
                <Typography variant="body1" paragraph align="center">
                  "{element.quote}"
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  - {element.author}
                </Typography>
                <IconButton
                  onClick={() => handleFavoriteToggle(element.quote,element)}
                  color={isFavorite(element.quote) ? "primary" : "default"}
                >
                  {isFavorite(element.quote) ? (
                    <Favorite />
                  ) : (
                    <FavoriteBorder />
                  )}
                </IconButton>
              </Box>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary" align="center">
            No quotes found.
          </Typography>
        )}
      </Grid>
    </div>
  );
}
