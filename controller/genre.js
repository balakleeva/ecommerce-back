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

module.exports = {
  getAll,
  create,
}
