const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  class Client extends Model {
    comparePassword(hash) {
      return bcrypt.compareSync(this.password, hash);
    }
  }

  Client.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
  });

  Client.beforeCreate(async (user) => {
    const hashPass = await bcrypt.hashSync(user.password, 10);
    user.password = hashPass;
  });
  return Client;
};
