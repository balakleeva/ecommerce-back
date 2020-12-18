const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
    class Admin extends Model {
        comparePassword(password) {
            return bcrypt.compareSync(password, this.password);
        }
    }
    Admin.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM,
            values: ['мастер_чистоты', 'бухгалтер', 'продавец', 'менеджер', 'директор'],
            allowNull: false
        }
    }, {
        sequelize,
    });

    Admin.beforeCreate(async (admin) => {
        const hashPass = await bcrypt.hashSync(admin.password, 10);
        admin.password = hashPass;
    });

    return Admin;
};
