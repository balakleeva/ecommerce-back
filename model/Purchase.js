const { DataTypes, Model } = require('sequelize');
module.exports = (sequelize) => {
    class Purchase extends Model {
    }

    Purchase.init({

    }, {
        sequelize,
    });

    return Purchase;
};
