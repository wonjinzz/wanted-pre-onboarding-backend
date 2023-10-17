const Sequelize = require('sequelize');

class JobOpening extends Sequelize.Model {
    static initiate(sequelize) {
        JobOpening.init({
            jobPosition: {
                type: Sequelize.STRING(15),
                allowNull: false,
            },
            jobReward: {
              type: Sequelize.INTEGER(),
              allowNull: false,
            },
            techStack: {
              type: Sequelize.STRING(15),
              allowNull: false,
            }
        },{
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'JobOpening',
            tableName: 'jobOpenings',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.JobOpening.hasMany(db.Application, { foreignKey: 'jobOpeningId', sourceKey: 'id' });
        db.JobOpening.belongsTo(db.Company, { foreignKey: 'companyId', targetKey: 'id' });
    }
};

module.exports = JobOpening;