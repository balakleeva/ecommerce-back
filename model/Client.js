const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  class Client extends Model {
    comparePassword(password) {
      return bcrypt.compareSync(password, this.password);
    }
  }

  Client.init({
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
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
