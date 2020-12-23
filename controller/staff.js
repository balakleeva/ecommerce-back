const { Staff } = require('../model')
const jwt = require('jsonwebtoken')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

async function auth(req, res) {
  const { login, password } = req.body

  const staff = await Staff.findOne({ where: { login } })
  if (!staff) {
    return res.status(400).json({ message: 'Wrong login!' })
  }

  const isRightPassword = await staff.comparePassword(password)

  if (!isRightPassword) {
    return res.status(400).json({ message: 'Wrong password!' })
  }

  const token = jwt.sign({ id: staff.id, role: staff.role }, process.env.SECRET)

  res.status(200).json({ data: token })
}

async function create(req, res) {
  let { name, login, password, role } = req.body

  if (!login) {
    login = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    password = 'qwerty1234'
  }

  const staff = await Staff.create({ name, login, password, role })

  res.status(200).json({ data: staff })
}

async function getAll(req, res) {
  const staff = await Staff.findAll()

  res.status(200).json({ data: staff })
}

async function search(req, res) {
  const { name, role } = req.query

  let searchParams = {}

  if (name) {
    searchParams.name = { [Op.iLike]: `${name}%` }
  }

  if (role) {
    searchParams.role = { [Op.eq]: role }
  }

  const staff = await Staff.findAll({ where: searchParams })

  res.status(200).json({ data: staff })
}

async function get(req, res) {
  const { id } = req.params;

  const staff = await Staff.findOne({ where: { id }});

  if (!staff) {
    return res.status(404).json({ message: 'Staff not found!'});
  }

  res.status(200).json({ data: staff });
}

async function update(req, res) {
  const { id } = req.params;
  const staff = await Staff.findOne({ where: { id }});

  if (!staff) {
    return res.status(404).json({ message: 'Staff not found!'});
  }

  const { name, role } = req.body;

  staff.name = name;
  staff.role = role;

  await staff.save();

  res.status(200).json({ data: staff });
}

module.exports = {
  auth,
  create,
  getAll,
  search,
  get,
  update,
}
