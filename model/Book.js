const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Book extends Model {
  }
  Book.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    publisher: {
      type: DataTypes.STRING,
    },
    publishYear: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    buyPrice: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    rentPrice: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    sequelize,
  });

  return Book;
};
