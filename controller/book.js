const { Book, Author, sequelize } = require('../model')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

async function getAll(req, res) {
  const books = await Book.findAll()

  res.status(200).json({ data: books })
}

async function getOne(req, res) {
  const { id } = req.params
  const book = await Book.findOne({
    where: { id },
    include: ['genre', 'author'],
  })

  res.status(200).json({ data: book })
}

async function create(req, res) {
  const {
    name,
    genreId,
    authorId,
    publisher,
    publishYear,
    image,
    buyPrice,
    rentPrice,
    quantity,
  } = req.body

  const book = await Book.create({
    name,
    genreId,
    authorId,
    publisher,
    publishYear,
    image,
    buyPrice,
    rentPrice,
    quantity,
  })

  res.status(200).json({ data: book })
}

async function update(req, res) {
  const { id } = req.params
  const book = await Book.findOne({ where: { id } })

  if (!book) {
    return res.status(404).json({ message: 'Book is not found!' })
  }

  const {
    name,
    genreId,
    authorId,
    publisher,
    publishYear,
    image,
    buyPrice,
    rentPrice,
    quantity,
  } = req.body

  book.name = name
  book.image = image
  book.genreId = genreId
  book.buyPrice = buyPrice
  book.quantity = quantity
  book.authorId = authorId
  book.publisher = publisher
  book.rentPrice = rentPrice
  book.publishYear = publishYear

  await book.save()

  res.status(200).json({ data: book })
}

async function remove(req, res) {
  const { id } = req.params
  await Book.destroy({ where: { id } })

  res.send(200).json({ message: 'Book has been removed!' })
}

async function getByIds(req, res) {
  let { ids } = req.query

  const books = await Book.findAll({ where: { id: ids } })

  res.status(200).json({ data: books })
}

async function search(req, res) {
  const {
    name,
    author,
    fromBuyPrice,
    toBuyPrice,
    fromRentPrice,
    toRentPrice,
  } = req.query

  let searchParams = {}

  if (name) {
    searchParams.name = { [Op.iLike]: `${name}%` }
  }

  // search for BUY price
  if (fromBuyPrice && toBuyPrice) {
    searchParams.buyPrice = { [Op.between]: [fromBuyPrice, toBuyPrice] }
  }

  if (fromBuyPrice && !toBuyPrice) {
    searchParams.buyPrice = { [Op.gte]: fromBuyPrice }
  }

  if (!fromBuyPrice && toBuyPrice) {
    searchParams.buyPrice = { [Op.lte]: toBuyPrice }
  }

  // search for RENT price
  if (fromRentPrice && toRentPrice) {
    searchParams.rentPrice = { [Op.between]: [fromRentPrice, toRentPrice] }
  }

  if (fromRentPrice && !toRentPrice) {
    searchParams.rentPrice = { [Op.gte]: fromRentPrice }
  }

  if (!fromRentPrice && toRentPrice) {
    searchParams.rentPrice = { [Op.lte]: toRentPrice }
  }

  const books = await Book.findAll({
    where: searchParams,
    include: {
      model: Author,
      as: 'author',
      where: { name: { [Op.iLike]: `${author}%` } },
    },
  })

  res.status(200).json({ data: books })
}

async function mostPopular(req, res) {
  const [data] = await sequelize.query(`
      SELECT COUNT(*) as book_count, "public"."Book_Purchase"."BookId", "public"."Books"."name" as name
      FROM "public"."Book_Purchase"
      INNER JOIN "public"."Books" ON "public"."Books"."id" = "public"."Book_Purchase"."BookId"
      GROUP BY "public"."Book_Purchase"."BookId", name
      ORDER BY book_count DESC
  `)

  res.status(200).json({ data: data })
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
  getByIds,
  search,
  mostPopular,
}
