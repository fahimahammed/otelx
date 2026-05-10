const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');
const { errorHandler, notFoundHandler, AppError, catchAsync } = require('./errorHandler');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

app.get('/', (req, res) => {
  logger.info('Hello World endpoint called');
  res.send('Hello World!');
});

app.use('/api/users', require('./routes/userRoutes'));

app.get('/error', catchAsync(async (req, res, next) => {
  throw new AppError('This is a test error', 400);
}));

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
