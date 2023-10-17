const Sequelize = require('sequelize');

class Company extends Sequelize.Model {
    static initiate(sequelize) {
        Company.init({
            name: {
                type: Sequelize.STRING(15),
                allowNull: false,
            },
            nation: {
                type: Sequelize.STRING(15),
                allowNull: false,
            },
            area: {
                type: Sequelize.STRING(15),
                allowNull: false,
            },
        },{
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Company',
            tableName: 'companys',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.Company.hasMany(db.JobOpening, { foreignKey: 'companyId', sourceKey: 'id' });
    }
};

module.exports = Company;