import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import Logger from './logger';

export default async ({ expressApp }: { expressApp: any }) => {
  // const mongoConnection = await mongooseLoader();
  // Logger.info('✌️ DB loaded and connected!');

  const userCredentialModel = {
    name: 'userCredentialModel',
    model: require('../models/user_credentials')
  }

  const userModel = {
    name: 'userModel',
    model: require('../models/users'),
  };

  const patientModel = {
    name: 'patientModel',
    model: require('../models/patient'),
  };

  const volunteerModel = {
    name: 'volunteerModel',
    model: require('../models/volunteer'),
  };

  const entryModel = {
    name: 'entryModel',
    model: require('../models/entry'),
  };

  const entrySectorModel = {
    name: 'entrySectorModel',
    model: require('../models/entrysector'),
  };

  const sectorModel = {
    name: 'sectorModel',
    model: require('../models/sector'),
  };

  const sectorMappingModel = {
    name: 'sectorMappingModel',
    model: require('../models/sectormapping'),
  };

  
  // create table
  userModel.model.sequelize.sync();

  // Set Containers for Dependency Injection
  await dependencyInjectorLoader({
    models: [
      userModel,
      userCredentialModel,
      patientModel,
      volunteerModel,
      entryModel,
      entrySectorModel,
      sectorModel,
      sectorMappingModel
    ],
  });
  Logger.info('✌️ Dependency Injector loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
