const { Author } = require('../model');

async function getAll(req, res) {
  const authors = await Author.findAll({});

  res.status(200).json({ data: authors });
}

async function create(req, res) {
  const { name, bio } = req.body;

  const author = await Author.create({ name, bio });

  res.status(200).json({ data: author });
}

module.exports = {
  getAll,
  create,
}
