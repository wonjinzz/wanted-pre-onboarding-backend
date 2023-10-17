const Sequelize = require('sequelize');

class Application extends Sequelize.Model {
    static initiate(sequelize) {
        Application.init({},{
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Application',
            tableName: 'applications',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.Application.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });
        db.Application.belongsTo(db.JobOpening, { foreignKey: 'jobOpeningId', targetKey: 'id' });
    }
};

module.exports = Application;