const { Book } = require('../model');

async function getAll(req, res) {
  const books = await Book.findAll();

  res.status(200).json({ data: books });
}

async function getOne(req, res) {
  const { id } = req.params;
  const book = await Book.findOne({ where: { id }, include: ['genre', 'author'] })

  res.status(200).json({ data: book });
}

async function create(req, res) {
  const { name, genreId, authorId, publisher, publishYear, image } = req.body;
  const book = await Book.create({
    name, genreId, authorId, publisher, publishYear, image
  });

  res.status(200).json({ data: book });
}

async function update(req, res) {
  const { id } = req.params;
  const book = await Book.findOne({ where: { id } });

  if (!book) {
    return res.status(404).json({ message: 'Book is not found!' });
  }

  const { name, genreId, authorId, publisher, publishYear, image } = req.body;
  book.name = name;
  book.image = image;
  book.genreId = genreId;
  book.authorId = authorId;
  book.publisher = publisher;
  book.publishYear = publishYear;

  await book.save();

  res.status(200).json({ data: book });
}

async function remove(req, res) {
  const { id } = req.params;
  await Book.destroy({ where: { id }});

  res.send(200).json({ message: 'Book has been remove!'});
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
}
