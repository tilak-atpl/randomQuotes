// src/components/FavoriteQuotes.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress } from '@mui/material';

const FavoriteQuotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3000/api/favourites');
        setQuotes(response.data);
      } catch (error) {
        setError('Error fetching quotes');
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      {quotes.length === 0 ? (
        <Typography>No favorite quotes found</Typography>
      ) : (
        quotes.map((quote) => (
          <Box key={quote.id} my={2} p={2} border={1} borderRadius={4}>
            <Typography variant="h6">{quote.content}</Typography>
            <Typography variant="subtitle1">- {quote.author}</Typography>
          </Box>
        ))
      )}
    </Box>
  );
};

export default FavoriteQuotes;
