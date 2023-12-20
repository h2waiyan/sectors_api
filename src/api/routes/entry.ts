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
    app.use('/entry', route);

    route.post(
        '',
        // middlewares.isAuth,
        async (req: Request, res: Response, next: NextFunction) => {
            const logger: Logger = Container.get('logger');
            logger.debug('Calling Reset Password endpoint with body: %o', req.body);
            try {
                const entryService = Container.get(EntryService);
                const result = await entryService.createEntry(req.body);
                return res.status(201).json(result.response);
            } catch (e) {
                logger.error('🔥 error: %o', e);
                return next(e);
            }
        },
    );

    route.put(
        '',
        // middlewares.isAuth,
        async (req: Request, res: Response, next: NextFunction) => {
            const logger: Logger = Container.get('logger');
            logger.debug('Calling Reset Password endpoint with body: %o', req.body);
            try {
                const entryService = Container.get(EntryService);
                const result = await entryService.updateEntry(req.body);
                return res.status(201).json(result);
            } catch (e) {
                logger.error('🔥 error: %o', e);
                return next(e);
            }
        },
    );

    route.get(
        '',
        // middlewares.isAuth,
        async (req: Request, res: Response, next: NextFunction) => {
            const logger: Logger = Container.get('logger');
            logger.debug('Calling Reset Password endpoint with body: %o', req.body);
            try {
                const entryService = Container.get(EntryService);
                const result = await entryService.getEntries();

                console.log("-------");

                console.log(result);
                return res.status(200).json(result);
            } catch (e) {
                logger.error('🔥 error: %o', e);
                return next(e);
            }
        },
    );

    route.post(
        '/sectors',
        // middlewares.isAuth,
        async (req: Request, res: Response, next: NextFunction) => {
            const logger: Logger = Container.get('logger');
            logger.debug('Calling Reset Password endpoint with body: %o', req.body);
            try {
                const entryService = Container.get(EntryService);
                const result = await entryService.getSectors();

                console.log("-------");

                console.log(result);
                return res.status(200).json(result);
            } catch (e) {
                logger.error('🔥 error: %o', e);
                return next(e);
            }
        },
    );

    route.post(
        '/sectors/add',
        // middlewares.isAuth,
        async (req: Request, res: Response, next: NextFunction) => {
            const logger: Logger = Container.get('logger');
            logger.debug('Calling Reset Password endpoint with body: %o', req.body);
            try {
                const entryService = Container.get(EntryService);
                const result = await entryService.createSectors(req.body);

                console.log("-------");

                console.log(result);
                return res.status(200).json(result);
            } catch (e) {
                logger.error('🔥 error: %o', e);
                return next(e);
            }
        },
    );

    route.post(
        '/sectors/delete',
        // middlewares.isAuth,
        async (req: Request, res: Response, next: NextFunction) => {
            const logger: Logger = Container.get('logger');
            logger.debug('Calling Reset Password endpoint with body: %o', req.body);
            try {
                const entryService = Container.get(EntryService);
                const result = await entryService.deleteAllSectors();

                console.log("-------");

                console.log(result);
                return res.status(200).json(result);
            } catch (e) {
                logger.error('🔥 error: %o', e);
                return next(e);
            }
        },
    );


    route.delete(
        '/:entryid',
        // middlewares.isAuth,
        async (req: Request, res: Response, next: NextFunction) => {
            const logger: Logger = Container.get('logger');
            logger.debug('Calling Reset Password endpoint with body: %o', req.body);
            try {
                const entryid = req.params.entryid;
                const entryService = Container.get(EntryService);
                const result = await entryService.deleteEntry(entryid);

                console.log("-------");

                console.log(result);
                return res.status(200).json(result);
            } catch (e) {
                logger.error('🔥 error: %o', e);
                return next(e);
            }
        },
    );

    route.delete(
        '',
        // middlewares.isAuth,
        async (req: Request, res: Response, next: NextFunction) => {
            const logger: Logger = Container.get('logger');
            logger.debug('Calling Reset Password endpoint with body: %o', req.body);
            try {
                const entryService = Container.get(EntryService);
                const result = await entryService.deleteAllEntry();

                console.log("-------");

                console.log(result);
                return res.status(200).json(result);
            } catch (e) {
                logger.error('🔥 error: %o', e);
                return next(e);
            }
        },
    );

};
