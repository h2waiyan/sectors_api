import { Sequelize } from 'sequelize';
import sequelize from '../sequelize';

// Model for patient table
const sectorModel = (sequelize: any, Sequelize: any) => {
    const sectors = sequelize.define('sectors', {
        sectorid: {
            type: Sequelize.STRING,
        },
        name: {
            type: Sequelize.STRING,
        }
    });

    return sectors;
};


const sectorTable: any = {};
sectorTable.Sequelize = Sequelize;
sectorTable.sequelize = sequelize;

//create model
sectorTable.services = sectorModel(sequelize, Sequelize);

module.exports = sectorTable;
