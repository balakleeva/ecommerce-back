const { Purchase, Book } = require('../model');

async function getAll(req, res) {
    const purchases = await Purchase.findAll({ include: [Book, 'client'] });

    res.status(200).json({ data: purchases });
}

async function getOne(req, res) {
    const { id } = req.params

    const purchase = await Purchase.findOne({ where: { id }, include: [Book, 'client', 'admin'] });

    res.status(200).json({ data: purchase });
}

async function create(req, res) {
    const { bookIds } = req.body;

    const clientId = req.user.id

    const purchase = await Purchase.create({ clientId, clientId });

    await bookIds.forEach(async (book) => {
        await purchase.addBook(book)
    })

    res.status(200).json({ data: purchase });
}

async function createAdmin(req, res) {
    const { bookIds, clientId } = req.body;

    // TODO clients....
    const adminId = req.admin.id

    const purchase = await Purchase.create({ adminId });

    await bookIds.forEach(async (book) => {
        await purchase.addBook(book)
    })

    res.status(200).json({ data: purchase });
}

async function mostExpensive(req, res) {
    const purchase = await Purchase.findOne({})
}

module.exports = {
    getAll,
    getOne,
    create,
    createAdmin
}
