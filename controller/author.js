const { Author } = require('../model');

async function getAll(req, res) {
  const authors = await Author.findAll({});

  res.status(200).json({ data: authors });
}

async function create(req, res) {
  const { name, bio } = req.body;

  const author = await Author.create({ name, bio });

  res.status(200).json({ data: author });
}

async function deleteAuthor(req, res) {
  const { id } = req.params

  await Author.destroy({ where: { id } })

  res.send(200).json({ message: 'Author has been removed!' });
}

async function get(req, res) {
  const { id } = req.params;

  const data = await Author.findOne({ where: { id } });

  if (!data) {
    return res.status(404).json({ message: 'Author not found!' });
  }

  res.status(200).json({ data });
}

async function update(req, res) {
  const { id } = req.params;

  const data = await Author.findOne({ where: { id } });

  if (!data) {
    return res.status(404).json({ message: 'Author not found!' });
  }

  const { name, bio } = req.body;

  data.name = name;
  data.bio = bio;

  await data.save();

  res.status(200).json({ data });
}

async function remove(req, res) {
 const { id } = req.params;

  await Author.destroy({ where: { id } });

  res.status(200).json({ message: 'Author has been deleted!'});
}

module.exports = {
  getAll,
  create,
  deleteAuthor,
  update,
  get,
  remove,
}
