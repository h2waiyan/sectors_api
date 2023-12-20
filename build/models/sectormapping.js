"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../sequelize"));
// Model for patient table
const sectorMappingModel = (sequelize, Sequelize) => {
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
const sectorMappingTable = {};
sectorMappingTable.Sequelize = sequelize_1.Sequelize;
sectorMappingTable.sequelize = sequelize_2.default;
//create model
sectorMappingTable.services = sectorMappingModel(sequelize_2.default, sequelize_1.Sequelize);
module.exports = sectorMappingTable;
