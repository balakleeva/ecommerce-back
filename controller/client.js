const { Client } = require('../model');

async function getAll(req, res) {
  const clients = await Client.findAll();

  res.status(200).json({ data: clients });
}

async function create(req, res) {
  const book = await Client.create({ name: 'Test Name', phone: 1 });

  res.status(200).json({ data: book });
}

module.exports = {
  getAll,
  create,
}
