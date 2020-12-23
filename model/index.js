const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.DB_URL)

const Staff = require('./Staff')(sequelize)
const Author = require('./Author')(sequelize)
const Client = require('./Client')(sequelize)
const Genre = require('./Genre')(sequelize)
const Book = require('./Book')(sequelize)
const Purchase = require('./Purchase')(sequelize)
const Rent = require('./Rent')(sequelize)
const Order = require('./Order')(sequelize)

Book.Genre = Book.belongsTo(Genre, { as: 'genre' })
Book.Author = Book.belongsTo(Author, { as: 'author' })
Book.belongsToMany(Purchase, { through: 'Book_Purchase' })
Book.belongsToMany(Rent, { through: 'Book_Rent' })

Purchase.Client = Purchase.belongsTo(Client, { as: 'client' })
Purchase.Staff = Purchase.belongsTo(Staff, { as: 'staff' })

Staff.Purchase = Staff.hasMany(Purchase, { as: 'purchase' })
Purchase.belongsToMany(Book, { through: 'Book_Purchase' })

Rent.Client = Rent.belongsTo(Client, { as: 'client' })
Rent.Staff = Rent.belongsTo(Staff, { as: 'staff' })

Staff.Rent = Staff.hasMany(Rent, { as: 'rent' })
Rent.belongsToMany(Book, { through: 'Book_Rent' })

Order.Client = Order.belongsTo(Client, { as: 'client' })

// Genre.sync({ force: true });
// Book.sync({ force: true });
// Purchase.sync({ force: true });
// Client.sync({ force: true });
// Staff.sync({ force: true });
// Rent.sync({ force: true });
// Order.sync({ force: true });

// Staff.create({
//   name: 'admin',
//   login: 'baskov',
//   password: 'restart987',
//   role: 'директор'
// })

module.exports = {
  sequelize,
  Staff,
  Author,
  Client,
  Genre,
  Book,
  Purchase,
  Rent,
  Order
}
