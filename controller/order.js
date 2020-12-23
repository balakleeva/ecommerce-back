const { Order, Book, Client } = require('../model')

async function getAll(req, res) {
  const orders = await Order.findAll({ include: ['client'] })

  res.status(200).json({ data: orders })
}

async function getOne(req, res) {
  const { orderId } = req.params

  const order = await Order.findOne({ where: { id: orderId } })

  res.status(200).json({ data: order })
}

async function create(req, res) {
  const { bookName } = req.body

  const clientId = req.user.id

  const order = await Order.create({ bookName, clientId })

  res.status(200).json({ data: order })
}

async function makeDone(req, res) {
  const { orderId } = req.params

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

  const order = await Order.findOne({ where: { id: orderId } })

  order.isDone = true

  order.save()

  res.status(200).json({ data: order })
}

async function search(req, res) {
  const { clientId, isDone } = req.query

  let searchParams = {}
  let clientParams = {}

  if (isDone === 'true' || isDone === 'false') {
    searchParams.isDone = isDone
  }

  if (clientId) {
    clientParams.id = clientId
  }

  const orders = await Order.findAll({
    where: searchParams,
    include: [
      {
        model: Client,
        as: 'client',
        where: clientParams,
      },
    ],
  })

  res.status(200).json({ data: orders })
}

module.exports = {
  getAll,
  getOne,
  create,
  makeDone,
  search,
}
