const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_URL);

const Admin = require('./Admin')(sequelize);
const Author = require('./Author')(sequelize);
const Client = require('./Client')(sequelize)
const Genre = require('./Genre')(sequelize);
const Book = require('./Book')(sequelize);
const Purchase = require('./Purchase')(sequelize)

Book.Genre = Book.belongsTo(Genre, { as: 'genre' });
Book.Author = Book.belongsTo(Author, { as: 'author' });
Book.belongsToMany(Purchase, { through: 'Book_Purchase' })

Purchase.Client = Purchase.belongsTo(Client, { as: 'client' })
Purchase.Admin = Purchase.belongsTo(Admin, { as: 'admin' })

Admin.Purchase = Admin.hasMany(Purchase, { as: 'purchase' })
Purchase.belongsToMany(Book, { through: 'Book_Purchase' })

// Book.sync({ force: true });
// Purchase.sync({ force: true });
// Client.sync({ force: true });
// Admin.sync({ force: true });

// Admin.create({
//   name: 'Admin',
//   login: 'baskov',
//   password: 'restart987',
//   role: 'директор'
// })

module.exports = {
  sequelize,
  Admin,
  Author,
  Client,
  Genre,
  Book,
  Purchase,
}
