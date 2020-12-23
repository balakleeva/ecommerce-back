const { DataTypes, Model } = require('sequelize');
module.exports = (sequelize) => {
  class Genre extends Model {
  }

  Genre.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genreType: {
      type: DataTypes.ENUM,
      values: ['журнал', 'книга'],
      allowNull: false,
    },
  }, {
    sequelize,
    paranoid: true,
  });

  return Genre;
};
