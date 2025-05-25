const express = require('express');
const cors = require('cors');
const logger = require('./src/middleware/logger');
const booksRouter = require('./src/routes/books');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger); // Custom logger middleware

// Routes
app.use('/books', booksRouter);

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Books API is running!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
