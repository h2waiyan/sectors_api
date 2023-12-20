import { Router } from 'express';
import auth from './routes/auth';
import user from './routes/user';
import patient from './routes/patient';
import volunteer from './routes/volunteer';
import entry from './routes/entry';
import sector from './routes/sector';
// guaranteed to get dependencies
export default () => {
	const app = Router();
	auth(app);
	user(app);
	patient(app);
	volunteer(app);
	entry(app);
	sector(app);

	return app
}