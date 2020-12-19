const { DataTypes, Model } = require('sequelize')
module.exports = (sequelize) => {
  class Rent extends Model {}

  Rent.init(
    {
      returnDate: {
        type: DataTypes.STRING,
      },
      rentSum: {
        type: DataTypes.FLOAT,
      },
      isReturned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
    },
    {
      sequelize,
    }
  )

  return Rent
}
