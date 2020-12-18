const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_URL);

const Admin = require('./Admin')(sequelize);
const Author = require('./Author')(sequelize);
const Client = require('./Client')(sequelize)
const Genre = require('./Genre')(sequelize);
const Book = require('./Book')(sequelize);

Book.Genre = Book.belongsTo(Genre, { as: 'genre' });
Book.Author = Book.belongsTo(Author, { as: 'author' });

// Book.sync({ force: true });
// Client.sync({ force: true });

module.exports = {
  sequelize,
  Admin,
  Author,
  Client,
  Genre,
  Book,
}
