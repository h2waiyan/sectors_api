import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
import config from '../config';
import bcrypt from 'bcrypt';
import { IUser, IUserCredentialModel, IUserInputDTO, IUserModel } from '../interfaces/IUser';
import { v4 as uuidv4 } from 'uuid';
import { Patient } from '../interfaces/patient';
import responseFunction from '../common/responseFunction';
import { IResponse } from '../interfaces/common';

@Service()
export default class EntryService {
  constructor(
    @Inject('sectorModel') private sectorModel: any,
    @Inject('sectorMappingModel') private sectorMappingModel: any,
    @Inject('entryModel') private entryModel: any,
    @Inject('entrySectorModel') private entrySectorModel: any,
  ) {}

  /**
   * Sign Up
   * @param Patient sign up user object
   * @returns
   */
  public async createEntry(entry: any): Promise<{ response: IResponse }> {
    try {
      const entryid = uuidv4();
      const sectorid = uuidv4();

      if (entry.name == '') {
        return { response: responseFunction('300', 'Please enter name.', []) };
      }

      if (entry.agreetoterms == false) {
        return { response: responseFunction('300', 'Please agree to terms and conditions.', []) };
      }

      if (entry.sectors.length == 0) {
        return { response: responseFunction('300', 'Please select at least one sector.', []) };
      }

      for (let i = 0; i < entry.sectors.length; i++) {
        const entrySectorData = {
          entrysectorid: uuidv4(),
          entryid: entryid,
          sectorid: entry.sectors[i],
        };
        await this.entrySectorModel.services.create(entrySectorData);
      }

      const entryData = {
        name: entry.name,
        entryid: entryid,
        agreetoterms: entry.agreetoterms,
      };

      var entryRecord: any;
      await this.entryModel.services.create(entryData).then((data: any) => {
        entryRecord = data;
      });

      if (!entryRecord) {
        throw new Error('Cannot be created');
      }

      const response: IResponse = responseFunction('200', 'Created successfully.', [entryRecord]);
      return { response };
    } catch (e) {
      throw e;
    }
  }

  public async updateEntry(entry: any): Promise<Object> {
    try {
      if (entry.entryid == '') {
        return responseFunction('300', 'Please enter entryid.', []);
      }
      if (entry.name == '') {
        return responseFunction('300', 'Please enter name.', []);
      }

      if (entry.agreetoterms == false) {
        return responseFunction('300', 'Please agree to terms and conditions.', []);
      }

      if (entry.sectors.length == 0) {
        return responseFunction('300', 'Please select at least one sector.', []);
      }

      var result: any;

      // find by entry id in entryModel and update
      var entryRecord: any;
      await this.entryModel.services.findOne({ where: { entryid: entry.entryid } }).then(async (data: any) => {
        console.log('--------------------', data);
        if (data) {
          
          // find by entry id in entrySectorModel and delete
          await this.entrySectorModel.services.destroy({ where: { entryid: entry.entryid } });
          for (let i = 0; i < entry.sectors.length; i++) {
            const entrySectorData = {
              entrysectorid: uuidv4(),
              entryid: entry.entryid,
              sectorid: entry.sectors[i],
            };
            await this.entrySectorModel.services.create(entrySectorData);
          }
          await this.entryModel.services.update(
            { name: entry.name, agreetoterms: entry.agreetoterms },
            { where: { entryid: entry.entryid } },
          );
          entryRecord = data;
          result = responseFunction('200', 'Updated successfully.', []);
        } else {
          console.log('-------------------- here');
          result = responseFunction('300', 'Entry not found.', []);
        }
      });
      return result;
    } catch (e) {
      throw e;
    }
  }

  public async getEntries(): Promise<Object> {
    try {
      var result: any;

      // // clear all data from sector mapping table
      // await this.entryModel.services.destroy({ where: {} });
      // await this.entrySectorModel.services.destroy({ where: {} });

      // Mysql function to delete dat{a
      await this.entryModel.services.findAll({}).then(async (entryData: any) => {
        if (entryData) {
          const returncode = '200';
          const message = 'Entry List';
          var finalList: any = [];

          await this.entrySectorModel.services.findAll({}).then(async (entrySectorData: any) => {
            await this.sectorModel.services.findAll({}).then((sectorData: any) => {
              entryData.forEach((entry: any) => {
                var entrySectors: any = [];
                const sectorList = entrySectorData.filter((entrySector: any) => entrySector.entryid == entry.entryid);
                console.log(entrySectorData);
                console.log(sectorList);
                sectorList.forEach((entrySector: any) => {
                  var sectorName = sectorData.find((sector: any) => sector.sectorid == entrySector.sectorid)?.name;
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
          });
        } else {
          const returncode = '300';
          const message = 'Entry list not found';
          var data: any = [];
          result = { returncode, message, data };
          // return { response };
        }
      });
      return result;
    } catch (e) {
      throw e;
    }
  }

  public async getSectors(): Promise<Object> {
    try {
      console.log('here');
      var result: any;

      // Mysql function to delete dat{a
      await this.sectorModel.services.findAll().then(async (sectorData: any) => {
        if (sectorData) {
          console.log(sectorData);
          const returncode = '200';
          const message = 'Sector List';
          var data: any = [];
          // read all from sector mapping table
          await this.sectorMappingModel.services.findAll().then((sectorMappingData: any) => {
            const topLevelItems = sectorMappingData.filter(
              (pair: any) => !sectorMappingData.some((childPair: any) => childPair.childid === pair.parentid),
            );
            const topLevelID = [...new Set(topLevelItems.map((item: any) => item.parentid))];
            for (const id of topLevelID) {
              data.push(this.createNestedArray(sectorMappingData, sectorData, id, true));
            }

            // data = this.createNestedArray(sectorMappingData, sectorData, 1);
            result = { returncode, message, data };
          });
        } else {
          const returncode = '300';
          const message = 'Sector list not found';
          var data: any = [];
          result = { returncode, message, data };
          // return { response };
        }
      });
      return result;
    } catch (e) {
      throw e;
    }
  }

  public async createSectors(body: any): Promise<{ response: IResponse }> {
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
        await this.sectorModel.services.create(entrySectorData);
      }

      for (let i = 0; i < mapping.length; i++) {
        const { parentid, childid } = mapping[i];

        const entrySectorData = {
          mappingid: uuidv4(),
          parentid: parentid,
          childid: childid,
        };
        await this.sectorMappingModel.services.create(entrySectorData);
      }
      const response: IResponse = responseFunction('200', 'Created successfully.', []);
      return { response };
    } catch (e) {
      throw e;
    }
  }

  public createNestedArray(parentChildPairs: any, sectors: any, parentId: any, firsttime: boolean = false) {
    const nestedArray = [];

    // Find children of the current parentId
    const childrenPairs = parentChildPairs.filter((pair: any) => pair.parentid === parentId);

    // Recursively create nested array for each child
    for (const childPair of childrenPairs) {
      const { childid } = childPair;
      const sector = sectors.find((sector: any) => sector.sectorid === childid);

      if (sector) {
        const nestedChild: any = {
          sectorid: sector.sectorid,
          name: sector.name,
          children: this.createNestedArray(parentChildPairs, sectors, childid),
        };
        nestedArray.push(nestedChild);
      }
    }

    if (firsttime) {
      const parentItem = sectors.find((sector: any) => sector.sectorid === parentId);

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

  public async deleteEntry(entryid: string): Promise<Object> {
    try {
      if (entryid == '') {
        return responseFunction('300', 'Please enter entryid.', []);
      }

      var result: any;

      // find by entry id in entryModel and update
      var entryRecord: any;
      await this.entryModel.services.findOne({ where: { entryid: entryid } }).then(async (data: any) => {
        console.log('--------------------', data);
        if (data) {
          // find by entry id in entrySectorModel and delete
          await this.entrySectorModel.services.destroy({ where: { entryid: entryid } });
          await this.entryModel.services.destroy({ where: { entryid: entryid } });
          entryRecord = data;
          result = responseFunction('200', 'Deleted successfully.', []);
        } else {
          console.log('-------------------- here');
          result = responseFunction('300', 'Entry not found.', []);
        }
      });
      return result;
    } catch (e) {
      throw e;
    }
  }

  public async deleteAllEntry(): Promise<Object> {
    try {
      var result: any;
      // delete all entries
      await this.entryModel.services.destroy({ where: {} });
      await this.entrySectorModel.services.destroy({ where: {} });
      result = responseFunction('200', 'Deleted successfully.', []);
      return result;
    } catch (e) {
      throw e;
    }
  }

  public async deleteAllSectors(): Promise<Object> {
    try {
      var result: any;
      // delete all entries
      await this.sectorModel.services.destroy({ where: {} });
    
      return result;
    } catch (e) {
      throw e;
    }
  }
}
