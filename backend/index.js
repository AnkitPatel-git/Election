const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');
const winston = require('winston');
require('dotenv').config();

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(helmet());

// Database connection setup
mongoose.connect(process.env.MongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
 
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));


// API Routes
app.use('/api/auth', require('./controllers/authcontroller'));
app.use('/api/voter', require('./controllers/voter/index'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  return res.status(500).json('Restricted');
});

// Logging configuration using winston
global.logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(), // Add timestamp
      winston.format.json()
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'app.log' })
    ]
  });
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port}!`));
