const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_URL);

const Author = require('./Author')(sequelize);
const Genre = require('./Genre')(sequelize);
const Book = require('./Book')(sequelize);

Book.Genre = Book.belongsTo(Genre, { as: 'genre' });
Book.Author = Book.belongsTo(Author, { as: 'author' });

module.exports = {
  sequelize,
  Author,
  Genre,
  Book,
}
