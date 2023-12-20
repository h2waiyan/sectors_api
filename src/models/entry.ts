import { Sequelize } from 'sequelize';
import sequelize from '../sequelize';

// Model for patient table
const entryModel = (sequelize: any, Sequelize: any) => {
    const entries = sequelize.define('entries', {
        entryid: {
            type: Sequelize.STRING,
        },
        name:{
            type: Sequelize.STRING,
        },
        agreetoterms: {
            type: Sequelize.BOOLEAN,
        }
    });

    return entries;
};


const entryTable: any = {};
entryTable.Sequelize = Sequelize;
entryTable.sequelize = sequelize;

//create model
entryTable.services = entryModel(sequelize, Sequelize);

module.exports = entryTable;
