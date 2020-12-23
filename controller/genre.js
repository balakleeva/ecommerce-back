const { Genre } = require('../model');

async function getAll(req, res) {
  const genres = await Genre.findAll({});

  res.status(200).json({ data: genres });
}

async function create(req, res) {
  const { name, genreType } = req.body;

  const genre = await Genre.create({ name, genreType });

  res.status(200).json({ data: genre });
}

async function update(req, res) {
  const { id } = req.params;
  const { name, genreType } = req.body;

  const genre = await Genre.findOne({ where: { id } });

  if (!genre) {
    return res.status(404).json({ message: 'Book is not found!' });
  }

  genre.name = name;
  genre.genreType = genreType;

  await genre.save();

  res.status(200).json({ data: genre });
}

async function get(req, res) {
  const { id } = req.params;
  const genre = await Genre.findOne({ where: { id } });

  if (!genre) {
    return res.status(404).json({ message: 'Book is not found!' });
  }

  res.status(200).json({ data: genre });
}

module.exports = {
  getAll,
  create,
  update,
  get,
};
