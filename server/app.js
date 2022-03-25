import express from 'express'
import mongoose from "mongoose"
import cors from 'cors'
import bodyParser from 'body-parser';

import {logger} from './config/logger.js';
import { env } from './config/globals.js';

(async function main() {
	try {
        logger.info('Initializing ORM connection...');

        const app = express()

        //Middlewares
        app.use(cors())
        app.use(bodyParser.json());

        app.get('/api', (req, res) =>  {
            res.json('Welcome to the API')
        })

        //Connect to DB
        mongoose.connect(env.NODE_CONNECTION, { useNewUrlParser: true},() => {
            console.log('Conntected to database')
        });
        
        app.listen(env.NODE_PORT, () => 
        console.log(`Server is running on ${env.NODE_PORT} in ${process.env.NODE_ENV} mode`
     ))

	} catch (err) {
		logger.error(err.stack);
	}
})();
