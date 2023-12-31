import express from 'express';
import cors from 'cors';
import routes from '../api';
import config from '../config';
import responseFunction from '../common/responseFunction';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

export default ({ app }: { app: express.Application }) => {
  /**
   * Health Check endpoints
   * @TODO Explain why they are here
   */
  app.get('/', (req, res) => {
    res.json({ message: 'Server is running!' });
  });

  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  //Header override
  app.use(require('method-override')());

  // Transforms the raw string of req.body into json
  app.use(express.json());

  // Load Swagger 
  // let express to use this
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // Load API routes
  app.use(config.api.prefix, routes());

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err: any = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

  /// error handlers
  app.use((err: any, req: any, res: any, next: any) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === 'UnauthorizedError') {
      return res.status(err.status).send(responseFunction('200', err.message, {})).end();
    }
    if (err.message === 'INVALID' || err.name === "INVALID") {
      return res.status(210).send(responseFunction('401', err.message, {})).end();
    }

    return next(err);
  });

  app.use((err: any, req: any, res: any, next: any) => {
    res.status(err.status || 500);
    res.json(responseFunction('200', err.message, {}));
  });
};
