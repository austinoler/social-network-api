// Import required modules
const express = require('express');
const mongoose = require('mongoose');

// Create an Express application
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON data
app.use(express.json());

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// Log MongoDB connection status
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Log any MongoDB connection errors
mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

// Define routes
app.use('/api/users', require('./routes/user'));
app.use('/api/thoughts', require('./routes/thought'));
app.use('/api/reactions', require('./routes/reaction'));

// Default route for handling unknown endpoints
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
