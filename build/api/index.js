"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const patient_1 = __importDefault(require("./routes/patient"));
const volunteer_1 = __importDefault(require("./routes/volunteer"));
const entry_1 = __importDefault(require("./routes/entry"));
const sector_1 = __importDefault(require("./routes/sector"));
// guaranteed to get dependencies
exports.default = () => {
    const app = (0, express_1.Router)();
    (0, auth_1.default)(app);
    (0, user_1.default)(app);
    (0, patient_1.default)(app);
    (0, volunteer_1.default)(app);
    (0, entry_1.default)(app);
    (0, sector_1.default)(app);
    return app;
};
