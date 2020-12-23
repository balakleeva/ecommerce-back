const { DataTypes, Model } = require('sequelize');
module.exports = (sequelize) => {
  class Author extends Model {
  }

  Author.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    bio: {
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    paranoid: true,
  });

  return Author;
};
