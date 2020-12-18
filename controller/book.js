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
  const { name, genreId, authorId, publisher, publishYear, image, buyPrice, rentPrice } = req.body;
  const book = await Book.create({
    name, genreId, authorId, publisher, publishYear, image, buyPrice, rentPrice
  });

  res.status(200).json({ data: book });
}

async function update(req, res) {
  const { id } = req.params;
  const book = await Book.findOne({ where: { id } });

  if (!book) {
    return res.status(404).json({ message: 'Book is not found!' });
  }

  const { name, genreId, authorId, publisher, publishYear, image, buyPrice, rentPrice } = req.body;

  book.name = name;
  book.image = image;
  book.genreId = genreId;
  book.buyPrice = buyPrice;
  book.authorId = authorId;
  book.publisher = publisher;
  book.rentPrice = rentPrice;
  book.publishYear = publishYear;

  await book.save();

  res.status(200).json({ data: book });
}

async function remove(req, res) {
  const { id } = req.params;
  await Book.destroy({ where: { id } });

  res.send(200).json({ message: 'Book has been removed!' });
}

async function getByIds(req, res) {
  let { ids } = req.query;

  const books = await Book.findAll({ where: { id: ids } })

  res.status(200).json({ data: books });
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
  getByIds
}
