const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class Client extends Model {
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
    }, {
        sequelize,
    });

    return Client;
};
