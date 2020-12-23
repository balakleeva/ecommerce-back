const { DataTypes, Model } = require('sequelize');
module.exports = (sequelize) => {
	class Order extends Model {
	}

	Order.init({
		bookName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		isDone: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}
	}, {
		sequelize,
	});

	return Order;
};
