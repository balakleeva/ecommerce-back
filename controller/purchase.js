const { Purchase, Book, Client } = require('../model')
const Sequelize = require('sequelize')

async function getAll(req, res) {
  const purchases = await Purchase.findAll({ include: [Book, 'client'] })

  res.status(200).json({ data: purchases })
}

async function getOne(req, res) {
  const { id } = req.params

  const purchase = await Purchase.findOne({
    where: { id },
    include: [Book, 'client', 'admin'],
  })

  res.status(200).json({ data: purchase })
}

async function create(req, res) {
  const { bookIds } = req.body

  const clientId = req.user.id

  const books = await Book.findAll({ where: { id: bookIds } })

  const buySum = books.reduce((acc, book) => {
    return acc + book.buyPrice
  }, 0)

  const purchase = await Purchase.create({ clientId, buySum })

  await bookIds.forEach(async (book) => {
    await purchase.addBook(book)
  })

  await Book.decrement('quantity', { where: { id: bookIds } })

  res.status(200).json({ data: purchase })
}

async function createAdmin(req, res) {
  const { bookIds, client, isNew } = req.body

  // TODO clients....
  const adminId = req.admin.id

  const books = await Book.findAll({ where: { id: bookIds } })

  const buySum = books.reduce((acc, book) => {
    return acc + book.buyPrice
  }, 0)

  const clientId = !isNew ? client : null

  const purchase = await Purchase.create({
    adminId,
    buySum,
    clientId,
    guestName: isNew ? client : '',
  })

  await bookIds.forEach(async (book) => {
    await purchase.addBook(book)
  })

  await Book.decrement('quantity', { where: { id: bookIds } })

  res.status(200).json({ data: purchase })
}

async function mostExpensive(req, res) {
  const maxPrice = await Purchase.findAll({
    attributes: [[Sequelize.fn('max', Sequelize.col('buySum')), 'maxSum']],
    raw: true,
  })

  const purchase = await Purchase.findOne({
    where: { buySum: maxPrice[0].maxSum },
  })

  res.status(200).json({ data: purchase })
}

module.exports = {
  getAll,
  getOne,
  create,
  createAdmin,
  mostExpensive,
}
