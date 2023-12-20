"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../sequelize"));
// Model for patient table
const sectorModel = (sequelize, Sequelize) => {
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
const sectorTable = {};
sectorTable.Sequelize = sequelize_1.Sequelize;
sectorTable.sequelize = sequelize_2.default;
//create model
sectorTable.services = sectorModel(sequelize_2.default, sequelize_1.Sequelize);
module.exports = sectorTable;
