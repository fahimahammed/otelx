const userService = require('../services/userService');
const logger = require('../logger');

function createUser(req, res) {
    logger.info(`Creating user with data: ${JSON.stringify(req.body)}`);
    return userService.createUser(req, res);
}

module.exports = {
    createUser,
};