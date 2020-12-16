const { Book, Genre, Author } = require('../model');

async function getAll(req, res) {
  const books = await Book.findAll({
    include: ['genre', 'author']
  });

  res.status(200).json({ data: books });
}

async function create(req, res) {
  const book = await Book.create({ name: 'Test Name', genreId: 1, authorId: 1, publisher: 'publisher', publishYear: '2002' });

  res.status(200).json({ data: book });
}

module.exports = {
  getAll,
  create,
}
