import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import { Patient } from '../../interfaces/patient';
import middlewares from '../middlewares';
import PatientService from '../../services/patient';
import EntryService from '../../services/entry';

const route = Router();

export default (app: Router) => {
  app.use('/sector', route);

  route.get(
    '',
    // middlewares.isAuth,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling Reset Password endpoint with body: %o', req.body);
      try {
        const patientServiceInstance = Container.get(EntryService);
        const result = await patientServiceInstance.getSectors();

        console.log('-------');

        console.log(result);
        return res.status(200).json(result);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
