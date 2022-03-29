import {mongoose} from "mongoose";
import { env } from '../config/globals.js';

export async function ServerConnection() {

    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }

    // Set up default mongoose connection
    await mongoose.connect(env.NODE_CONNECTION, options)
    .then(() => { 
        console.log('Conntected to database') 
    },
        err => { console.log(err) }
    );
}

export default ServerConnection
