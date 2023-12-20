"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../sequelize"));
// Model for patient table
const entrySectorModel = (sequelize, Sequelize) => {
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
const entrySectorTable = {};
entrySectorTable.Sequelize = sequelize_1.Sequelize;
entrySectorTable.sequelize = sequelize_2.default;
//create model
entrySectorTable.services = entrySectorModel(sequelize_2.default, sequelize_1.Sequelize);
module.exports = entrySectorTable;
