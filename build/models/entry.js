"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../sequelize"));
// Model for patient table
const entryModel = (sequelize, Sequelize) => {
    const entries = sequelize.define('entries', {
        entryid: {
            type: Sequelize.STRING,
        },
        name: {
            type: Sequelize.STRING,
        },
        agreetoterms: {
            type: Sequelize.BOOLEAN,
        }
    });
    return entries;
};
const entryTable = {};
entryTable.Sequelize = sequelize_1.Sequelize;
entryTable.sequelize = sequelize_2.default;
//create model
entryTable.services = entryModel(sequelize_2.default, sequelize_1.Sequelize);
module.exports = entryTable;
