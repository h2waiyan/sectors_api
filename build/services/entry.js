"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const typedi_1 = require("typedi");
const uuid_1 = require("uuid");
const responseFunction_1 = __importDefault(require("../common/responseFunction"));
let EntryService = class EntryService {
    constructor(sectorModel, sectorMappingModel, entryModel, entrySectorModel) {
        this.sectorModel = sectorModel;
        this.sectorMappingModel = sectorMappingModel;
        this.entryModel = entryModel;
        this.entrySectorModel = entrySectorModel;
    }
    /**
     * Sign Up
     * @param Patient sign up user object
     * @returns
     */
    createEntry(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entryid = (0, uuid_1.v4)();
                const sectorid = (0, uuid_1.v4)();
                if (entry.name == '') {
                    return { response: (0, responseFunction_1.default)('300', 'Please enter name.', []) };
                }
                if (entry.agreetoterms == false) {
                    return { response: (0, responseFunction_1.default)('300', 'Please agree to terms and conditions.', []) };
                }
                if (entry.sectors.length == 0) {
                    return { response: (0, responseFunction_1.default)('300', 'Please select at least one sector.', []) };
                }
                for (let i = 0; i < entry.sectors.length; i++) {
                    const entrySectorData = {
                        entrysectorid: (0, uuid_1.v4)(),
                        entryid: entryid,
                        sectorid: entry.sectors[i],
                    };
                    yield this.entrySectorModel.services.create(entrySectorData);
                }
                const entryData = {
                    name: entry.name,
                    entryid: entryid,
                    agreetoterms: entry.agreetoterms,
                };
                var entryRecord;
                yield this.entryModel.services.create(entryData).then((data) => {
                    entryRecord = data;
                });
                if (!entryRecord) {
                    throw new Error('Cannot be created');
                }
                const response = (0, responseFunction_1.default)('200', 'Created successfully.', [entryRecord]);
                return { response };
            }
            catch (e) {
                throw e;
            }
        });
    }
    updateEntry(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (entry.entryid == '') {
                    return (0, responseFunction_1.default)('300', 'Please enter entryid.', []);
                }
                if (entry.name == '') {
                    return (0, responseFunction_1.default)('300', 'Please enter name.', []);
                }
                if (entry.agreetoterms == false) {
                    return (0, responseFunction_1.default)('300', 'Please agree to terms and conditions.', []);
                }
                if (entry.sectors.length == 0) {
                    return (0, responseFunction_1.default)('300', 'Please select at least one sector.', []);
                }
                var result;
                // find by entry id in entryModel and update
                var entryRecord;
                yield this.entryModel.services.findOne({ where: { entryid: entry.entryid } }).then((data) => __awaiter(this, void 0, void 0, function* () {
                    console.log('--------------------', data);
                    if (data) {
                        // find by entry id in entrySectorModel and delete
                        yield this.entrySectorModel.services.destroy({ where: { entryid: entry.entryid } });
                        for (let i = 0; i < entry.sectors.length; i++) {
                            const entrySectorData = {
                                entrysectorid: (0, uuid_1.v4)(),
                                entryid: entry.entryid,
                                sectorid: entry.sectors[i],
                            };
                            yield this.entrySectorModel.services.create(entrySectorData);
                        }
                        yield this.entryModel.services.update({ name: entry.name, agreetoterms: entry.agreetoterms }, { where: { entryid: entry.entryid } });
                        entryRecord = data;
                        result = (0, responseFunction_1.default)('200', 'Updated successfully.', []);
                    }
                    else {
                        console.log('-------------------- here');
                        result = (0, responseFunction_1.default)('300', 'Entry not found.', []);
                    }
                }));
                return result;
            }
            catch (e) {
                throw e;
            }
        });
    }
    getEntries() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var result;
                // // clear all data from sector mapping table
                // await this.entryModel.services.destroy({ where: {} });
                // await this.entrySectorModel.services.destroy({ where: {} });
                // Mysql function to delete dat{a
                yield this.entryModel.services.findAll({}).then((entryData) => __awaiter(this, void 0, void 0, function* () {
                    if (entryData) {
                        const returncode = '200';
                        const message = 'Entry List';
                        var finalList = [];
                        yield this.entrySectorModel.services.findAll({}).then((entrySectorData) => __awaiter(this, void 0, void 0, function* () {
                            yield this.sectorModel.services.findAll({}).then((sectorData) => {
                                entryData.forEach((entry) => {
                                    var entrySectors = [];
                                    const sectorList = entrySectorData.filter((entrySector) => entrySector.entryid == entry.entryid);
                                    console.log(entrySectorData);
                                    console.log(sectorList);
                                    sectorList.forEach((entrySector) => {
                                        var _a;
                                        var sectorName = (_a = sectorData.find((sector) => sector.sectorid == entrySector.sectorid)) === null || _a === void 0 ? void 0 : _a.name;
                                        var temp = {
                                            sectorid: entrySector.sectorid,
                                            name: sectorName,
                                        };
                                        entrySectors.push(temp);
                                    });
                                    // entrySectorData.forEach((entrySector: any) => {
                                    //   if (entry.entryid == entrySector.entryid) {
                                    //     console.log('here here ---------------')
                                    //     var sectorName = sectorData.find((sector: any) => sector.sectorid == entrySector.sectorid)?.name;
                                    //     var temp = {
                                    //       sectorid: entrySector.sectorid,
                                    //       name: sectorName,
                                    //     };
                                    //     entrySectors.push(temp);
                                    //   }
                                    // });
                                    finalList.push({
                                        entryid: entry.entryid,
                                        name: entry.name,
                                        sectorid: entry.sectorid,
                                        agreetoterms: entry.agreetoterms,
                                        sectors: entrySectors,
                                        // sectors: sectorList
                                    });
                                });
                                result = { returncode, message, finalList };
                            });
                        }));
                    }
                    else {
                        const returncode = '300';
                        const message = 'Entry list not found';
                        var data = [];
                        result = { returncode, message, data };
                        // return { response };
                    }
                }));
                return result;
            }
            catch (e) {
                throw e;
            }
        });
    }
    getSectors() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('here');
                var result;
                // Mysql function to delete dat{a
                yield this.sectorModel.services.findAll().then((sectorData) => __awaiter(this, void 0, void 0, function* () {
                    if (sectorData) {
                        console.log(sectorData);
                        const returncode = '200';
                        const message = 'Sector List';
                        var data = [];
                        // read all from sector mapping table
                        yield this.sectorMappingModel.services.findAll().then((sectorMappingData) => {
                            const topLevelItems = sectorMappingData.filter((pair) => !sectorMappingData.some((childPair) => childPair.childid === pair.parentid));
                            const topLevelID = [...new Set(topLevelItems.map((item) => item.parentid))];
                            for (const id of topLevelID) {
                                data.push(this.createNestedArray(sectorMappingData, sectorData, id, true));
                            }
                            // data = this.createNestedArray(sectorMappingData, sectorData, 1);
                            result = { returncode, message, data };
                        });
                    }
                    else {
                        const returncode = '300';
                        const message = 'Sector list not found';
                        var data = [];
                        result = { returncode, message, data };
                        // return { response };
                    }
                }));
                return result;
            }
            catch (e) {
                throw e;
            }
        });
    }
    createSectors(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(body);
                const { sector, mapping } = body;
                for (let i = 0; i < sector.length; i++) {
                    const { value, name } = sector[i];
                    const entrySectorData = {
                        // mappingid: uuidv4(),
                        sectorid: value,
                        name: name,
                    };
                    yield this.sectorModel.services.create(entrySectorData);
                }
                for (let i = 0; i < mapping.length; i++) {
                    const { parentid, childid } = mapping[i];
                    const entrySectorData = {
                        mappingid: (0, uuid_1.v4)(),
                        parentid: parentid,
                        childid: childid,
                    };
                    yield this.sectorMappingModel.services.create(entrySectorData);
                }
                const response = (0, responseFunction_1.default)('200', 'Created successfully.', []);
                return { response };
            }
            catch (e) {
                throw e;
            }
        });
    }
    createNestedArray(parentChildPairs, sectors, parentId, firsttime = false) {
        const nestedArray = [];
        // Find children of the current parentId
        const childrenPairs = parentChildPairs.filter((pair) => pair.parentid === parentId);
        // Recursively create nested array for each child
        for (const childPair of childrenPairs) {
            const { childid } = childPair;
            const sector = sectors.find((sector) => sector.sectorid === childid);
            if (sector) {
                const nestedChild = {
                    sectorid: sector.sectorid,
                    name: sector.name,
                    children: this.createNestedArray(parentChildPairs, sectors, childid),
                };
                nestedArray.push(nestedChild);
            }
        }
        if (firsttime) {
            const parentItem = sectors.find((sector) => sector.sectorid === parentId);
            if (parentItem) {
                const nestedParentItem = {
                    sectorid: parentItem.sectorid,
                    name: parentItem.name,
                    children: nestedArray,
                };
                return nestedParentItem;
            }
        }
        return nestedArray;
    }
    deleteEntry(entryid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (entryid == '') {
                    return (0, responseFunction_1.default)('300', 'Please enter entryid.', []);
                }
                var result;
                // find by entry id in entryModel and update
                var entryRecord;
                yield this.entryModel.services.findOne({ where: { entryid: entryid } }).then((data) => __awaiter(this, void 0, void 0, function* () {
                    console.log('--------------------', data);
                    if (data) {
                        // find by entry id in entrySectorModel and delete
                        yield this.entrySectorModel.services.destroy({ where: { entryid: entryid } });
                        yield this.entryModel.services.destroy({ where: { entryid: entryid } });
                        entryRecord = data;
                        result = (0, responseFunction_1.default)('200', 'Deleted successfully.', []);
                    }
                    else {
                        console.log('-------------------- here');
                        result = (0, responseFunction_1.default)('300', 'Entry not found.', []);
                    }
                }));
                return result;
            }
            catch (e) {
                throw e;
            }
        });
    }
    deleteAllEntry() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var result;
                // delete all entries
                yield this.entryModel.services.destroy({ where: {} });
                yield this.entrySectorModel.services.destroy({ where: {} });
                result = (0, responseFunction_1.default)('200', 'Deleted successfully.', []);
                return result;
            }
            catch (e) {
                throw e;
            }
        });
    }
    deleteAllSectors() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var result;
                // delete all entries
                yield this.sectorModel.services.destroy({ where: {} });
                return result;
            }
            catch (e) {
                throw e;
            }
        });
    }
};
EntryService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)('sectorModel')),
    __param(1, (0, typedi_1.Inject)('sectorMappingModel')),
    __param(2, (0, typedi_1.Inject)('entryModel')),
    __param(3, (0, typedi_1.Inject)('entrySectorModel')),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], EntryService);
exports.default = EntryService;
