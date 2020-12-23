const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
    class Staff extends Model {
        comparePassword(password) {
            return bcrypt.compareSync(password, this.password);
        }
    }
    Staff.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        login: {
            type: DataTypes.STRING,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
        },
        role: {
            type: DataTypes.ENUM,
            values: ['мастер_чистоты', 'бухгалтер', 'продавец', 'менеджер', 'директор'],
            allowNull: false
        }
    }, {
        sequelize,
    });

    Staff.beforeCreate(async (staff) => {
        const hashPass = await bcrypt.hashSync(staff.password, 10);
        staff.password = hashPass;
    });

    return Staff;
};
