const { Admin } = require('../model');
const jwt = require('jsonwebtoken');

async function auth(req, res) {
    const { login, password } = req.body;

    const admin = await Admin.findOne({ where: { login } });
    if (!admin) {
        return res.status(400).json({ message: 'Wrong login!' });
    }

    const isRightPassword = await admin.comparePassword(password);

    if (!isRightPassword) {
        return res.status(400).json({ message: 'Wrong password!' });
    }

    const token = jwt.sign({ id: admin.id, role: admin.role }, process.env.SECRET);

    res.status(200).json({ data: token });
}

async function create(req, res) {
    const { name, login, password, role } = req.body;

    const admin = await Admin.create({ name, login, password, role });

    res.status(200).json({ data: admin });
}

async function getAll(req, res) {
    const staff = await Admin.findAll();

    res.status(200).json({ data: staff });
}

module.exports = {
    auth,
    create,
    getAll
}
