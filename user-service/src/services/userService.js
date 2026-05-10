const userRepository = require('../repositories/userRepository');
const cache = require('../utils/cache');

const createUser = async (data) => {
    const user = await userRepository.create(data);
    await cache.set(`user:${user.id}`, user);
    return user;
};

const getUser = async (id) => {
    const cachedUser = await cache.get(`user:${id}`);
    if (cachedUser) {
        return cachedUser;
    }
    const user = await userRepository.findById(id);
    if (!user) {
        throw new Error('User not found');
    }
    await cache.set(`user:${id}`, user, 3600); // Cache for 1 hour
    return user;
};

const updateUser = async (id, data) => {
    const user = await userRepository.update(id, data);
    if (!user) {
        throw new Error('User not found');
    }
    await cache.set(`user:${id}`, user);
    return user;
};

const deleteUser = async (id) => {
    // delete user from db
    const result = await userRepository.delete(id);
    if (!result) {
        throw new Error('User not found');
    }
    // delete user from cache
    await cache.del(`user:${id}`);
    return result;
};

const getAllUsers = async () => {
    return await userRepository.findAll();
};

module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser,
    getAllUsers,
};
