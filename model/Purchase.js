const { DataTypes, Model } = require('sequelize')
module.exports = (sequelize) => {
  class Purchase extends Model {}

  Purchase.init(
    {
      buySum: {
        type: DataTypes.FLOAT,
      },
      guestName: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
    },
    {
      sequelize,
    }
  )

  return Purchase
}
