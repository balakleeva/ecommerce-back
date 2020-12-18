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

async function deleteAuthor(req, res) {
  const { id } = req.params

  await Author.destroy({ where: { id } })

  res.send(200).json({ message: 'Author has been removed!' });
}

module.exports = {
  getAll,
  create,
  deleteAuthor
}
