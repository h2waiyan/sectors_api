import { Sequelize } from 'sequelize';
import sequelize from '../sequelize';

// Model for patient table
const entrySectorModel = (sequelize: any, Sequelize: any) => {
    const entrySectors = sequelize.define('entrySectors', {
        entrysectorid: {
            type: Sequelize.STRING,
        },
        entryid: {
            type: Sequelize.STRING,
        },
        sectorid: {
            type: Sequelize.STRING,
        }
    });

    return entrySectors;
};


const entrySectorTable: any = {};
entrySectorTable.Sequelize = Sequelize;
entrySectorTable.sequelize = sequelize;

//create model
entrySectorTable.services = entrySectorModel(sequelize, Sequelize);

module.exports = entrySectorTable;
