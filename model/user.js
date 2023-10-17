const Sequelize = require('sequelize');

class User extends Sequelize.Model {
    static initiate(sequelize) {
        User.init({
            name: {
                type: Sequelize.STRING(15),
                allowNull: false,
            },
        },{
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.User.hasMany(db.Application, { foreignKey: 'userId', sourceKey: 'id' });
    }
};

module.exports = User;