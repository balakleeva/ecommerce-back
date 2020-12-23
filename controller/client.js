const { Client } = require('../model');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

async function getAll(req, res) {
  const clients = await Client.findAll({ attributes: ['name', 'phone', 'id']});

  res.status(200).json({ data: clients });
}

async function create(req, res) {
  const { login, name, phone, password } = req.body;

  await Client.create({ name, phone, password, login });

  res.status(200).json({ message: 'Successful registration!' });
}

async function auth(req, res) {
  const { login, password } = req.body;

  const client = await Client.findOne({ where: { login }});
  if (!client) {
    return res.status(400).json({ message: 'Wrong name!' });
  }

  const isRightPassword = await client.comparePassword(password);

  if (!isRightPassword) {
    return res.status(400).json({ message: 'Wrong password!' });
  }

  const token = jwt.sign({ id: client.id, login }, secret);

  res.status(200).json({ data: token });
}

module.exports = {
  getAll,
  create,
  auth,
}
