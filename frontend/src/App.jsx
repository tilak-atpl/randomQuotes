// src/App.jsx
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import ShowQuotes from './components/ShowQuotes';
import FavoriteQuotes from './components/FavoriteQuotes';

function App() {
  return (
    <Router>
      <Box>
        <Box my={2}>
          <Button component={Link} to="/" variant="contained" sx={{ marginRight: 2 }}>
            Home
          </Button>
          <Button component={Link} to="/favorites" variant="contained">
            Favorite Quotes
          </Button>
        </Box>
        <Routes>
          <Route path="/" element={<ShowQuotes />} />
          <Route path="/favorites" element={<FavoriteQuotes />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
