const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');
const { errorHandler, notFoundHandler, AppError, catchAsync } = require('./errorHandler');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.path}`);
    next();
});

app.get('/', (req, res) => {
    logger.info('Hello World endpoint called');
    res.send('Hello World!');
});

// Example route that throws an error
app.get('/error', catchAsync(async (req, res, next) => {
    throw new AppError('This is a test error', 400);
}));

// 404 handler - must be before error handler
app.use(notFoundHandler);

// Global error handler - must be last
app.use(errorHandler);

module.exports = app;