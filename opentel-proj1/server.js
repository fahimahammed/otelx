const PORT = process.env.PORT || 3000;
const app = require('./app');
const logger = require('./logger');

const startServer = () => {
    try{
        app.listen(PORT, () => {
            logger.info(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        logger.error('Error starting server:', error);
    }
};

startServer();