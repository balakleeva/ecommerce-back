const { Book } = require('../model');

async function getAll(req, res) {
  const books = await Book.findAll();

  res.status(200).json({ data: books });
}

async function getOne(req, res) {
  const book = await Book.findOne({ id: req.params.id, include: ['genre', 'author'] })

  res.status(200).json({ data: book });
}

async function create(req, res) {
  const book = await Book.create({ name: 'Test Name', genreId: 1, authorId: 1, publisher: 'publisher', publishYear: '2002' });

  res.status(200).json({ data: book });
}

module.exports = {
  getAll,
  getOne,
  create,
}
