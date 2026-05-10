function createUser(req, res) {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  const newUser = { id: Date.now(), name, email };
  return res.status(201).json({ message: 'User created successfully', user: newUser });
}

module.exports = {
  createUser,
};
