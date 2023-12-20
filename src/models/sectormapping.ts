import { Sequelize } from 'sequelize';
import sequelize from '../sequelize';

// Model for patient table
const sectorMappingModel = (sequelize: any, Sequelize: any) => {
    const sectorMappings = sequelize.define('sectorMappings', {
        mappingid: {
            type: Sequelize.STRING,
        },
        parentid: {
            type: Sequelize.STRING,
        },
        childid: {
            type: Sequelize.STRING,
        }
    });

    return sectorMappings;
};


const sectorMappingTable: any = {};
sectorMappingTable.Sequelize = Sequelize;
sectorMappingTable.sequelize = sequelize;

//create model
sectorMappingTable.services = sectorMappingModel(sequelize, Sequelize);

module.exports = sectorMappingTable;
