require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/dbConnection');
const authRoutes = require('./routes/authRoutes');
const quoteRoutes = require('./routes/quoteRoutes');
const cors = require('cors');

const User = require('./models/user');

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with the URL you want to allow
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify methods you want to allow
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify headers you want to allow
};

app.use(cors(corsOptions)); // Use the CORS middleware with options

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api', quoteRoutes);

sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
    // Sync the database schema
    return sequelize.sync();
  })
  .then(() => {
    console.log('Database synced');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
