const pool = require('../config/db');

const create = async (data) => {
    const { name, email } = data;
    const query = 'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *';
    const values = [name, email];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const findById = async (id) => {
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
};

const update = async (id, data) => {
    const { name, email } = data;
    const query = 'UPDATE users SET name = $1, email = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *';
    const values = [name, email, id];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const remove = async (id) => {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
};

const findAll = async () => {
    const query = 'SELECT * FROM users';
    const result = await pool.query(query);
    return result.rows;
};

module.exports = {
    create,
    findById,
    update,
    delete: remove,
    findAll,
};
