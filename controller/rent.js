const { Rent, Book, Client } = require('../model')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

async function getAll(req, res) {
  const rents = await Rent.findAll({ include: [Book, 'client'] })

  res.status(200).json({ data: rents })
}

async function getOne(req, res) {
  const { id } = req.params

  const rent = await Rent.findOne({ where: { id } })

  res.status(200).json({ data: rent })
}

async function updateReturn(req, res) {
  const { id } = req.params

  const rent = await Rent.findOne({ where: { id }, include: [Book] })

  rent.isReturned = !rent.isReturned

  await rent.save()

  await Book.increment('quantity', {
    where: { id: rent.Books.map((book) => book.id) },
  })

  res.status(200).json({ data: rent })
}

async function create(req, res) {
  const { bookIds } = req.body

  const clientId = req.user.id

  const books = await Book.findAll({ where: { id: bookIds } })

  const rentSum = books.reduce((acc, book) => {
    return acc + book.rentPrice
  }, 0)

  const returnDate = new Date(new Date().toISOString())
  returnDate.setDate(returnDate.getDate() + parseInt('10'))

  const rent = await Rent.create({
    clientId,
    rentSum,
    isReturned: false,
    returnDate: returnDate.toString(),
  })

  await bookIds.forEach(async (book) => {
    await rent.addBook(book)
  })

  await Book.decrement('quantity', { where: { id: bookIds } })

  res.status(200).json({ data: rent })
}

async function createAdmin(req, res) {
  const { bookIds, clientId } = req.body

  const adminId = req.admin.id

  const books = await Book.findAll({ where: { id: bookIds } })

  const rentSum = books.reduce((acc, book) => {
    return acc + book.rentPrice
  }, 0)

  const client = clientId ? clientId : null

  const returnDate = new Date(new Date().toISOString())
  returnDate.setDate(returnDate.getDate() + parseInt('10'))

  const rent = await Rent.create({
    clientId: client,
    adminId,
    rentSum,
    isReturned: false,
    returnDate: returnDate.toString(),
  })

  await bookIds.forEach(async (book) => {
    await rent.addBook(book)
  })

  await Book.decrement('quantity', { where: { id: bookIds } })

  res.status(200).json({ data: rent })
}

async function search(req, res) {
  const { client, rentMonth, isReturned } = req.query

  console.log('----------------------------', rentMonth)

  let searchParams = {}
  let clientParams = {}

  if (client) {
    clientParams.id = client
  }

  if (rentMonth) {
    const firstDayOfMonth = new Date(rentMonth)
    const lastDayOfMonth = new Date(
      firstDayOfMonth.getFullYear(),
      firstDayOfMonth.getMonth() + 1,
      0
    )
    searchParams.createdAt = { [Op.between]: [firstDayOfMonth, lastDayOfMonth] }
  }

  if (isReturned !== undefined && isReturned !== null) {
    searchParams.isReturned = isReturned
  }

  const rents = await Rent.findAll({
    where: searchParams,
    include: [
      Book,
      {
        model: Client,
        as: 'client',
        where: clientParams,
      },
    ],
  })

  res.status(200).json({ data: rents })
}

module.exports = {
  getAll,
  getOne,
  updateReturn,
  create,
  createAdmin,
  search,
}
