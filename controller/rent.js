const { Rent, Book } = require('../model')

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

  const rent = await Rent.findOne({ where: { id } })

  rent.isReturned = !rent.isReturned

  await rent.save()

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

  console.log('sum', rentSum)

  await bookIds.forEach(async (book) => {
    await rent.addBook(book)
  })

  res.status(200).json({ data: rent })
}

module.exports = {
  getAll,
  getOne,
  updateReturn,
  create,
}
