"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typedi_1 = require("typedi");
const entry_1 = __importDefault(require("../../services/entry"));
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use('/sector', route);
    route.get('', 
    // middlewares.isAuth,
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const logger = typedi_1.Container.get('logger');
        logger.debug('Calling Reset Password endpoint with body: %o', req.body);
        try {
            const patientServiceInstance = typedi_1.Container.get(entry_1.default);
            const result = yield patientServiceInstance.getSectors();
            console.log('-------');
            console.log(result);
            return res.status(200).json(result);
        }
        catch (e) {
            logger.error('🔥 error: %o', e);
            return next(e);
        }
    }));
};
