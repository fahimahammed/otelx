require('dotenv').config();
const app = require('./app');
const logger = require('./logger');

const PORT = process.env.PORT || 3000;

const startServer = () => {
    try{
        app.listen(PORT, () => {
            logger.info(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        logger.error('Error starting server:', error);
        process.exit(1);
    }
};

startServer();