const { Purchase } = require('../model');

async function getAll(req, res) {
    const purchases = await Purchase.findAll({});

    res.status(200).json({ data: purchases });
}

async function create(req, res) {
    const { clientId, bookIds, staffId } = req.body;

    const purchase = await Purchase.create({ clientId, bookIds, staffId });

    res.status(200).json({ data: purchase });
}

module.exports = {
    getAll,
    create,
}
