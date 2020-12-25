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

async function createAdmin(req, res) {
  const { name, phoneNumber } = req.body;

  const login = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  const password = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

  await Client.create({ name, phone: phoneNumber, password, login });

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

async function remove(req, res) {
  const { id } = req.params;

  await Client.destroy({ where: { id }});

  res.status(200).json({ message: 'Client has been deleted!'});
}

module.exports = {
  getAll,
  create,
  auth,
  remove,
  createAdmin
}
