import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';

import ServerConnection from './api/server.js';
import authRoute from './api/components/auth/auth.js'
import countryRoute from './api/components/country/routes.js'
import companyRoute from './api/components/company/routes.js'
import {logger} from './config/logger.js';
import { env } from './config/globals.js';

(async function main() {
	try {
        logger.info('Initializing ORM connection...');

        const app = express()

        //Middlewares
        app.use(bodyParser.json());
        app.use(cors())

        //Route middlewares
        app.use('/api/user', authRoute)
        app.use('/api', countryRoute)
        app.use('/api', companyRoute)

        ServerConnection()

        app.get('/api', (req, res) =>  {
            res.json('Welcome to the API')
        })


        // Start express server
        app.listen(env.NODE_PORT);

        app.on('listening', () => {
			    logger.info(`node server is listening on port ${env.NODE_PORT} in ${env.NODE_ENV} mode`);
		    });

         app.on('close', () => {
          logger.info('node server closed');
        });

	} catch (err) {
		logger.error(err.stack);
	}
})();
