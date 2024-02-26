'use strict'

import Express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { dbConnection } from './mongo';

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        
        this.middlewares();
        this.connectarDB();
        this.routes();
    }

    async connectarDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes(){

    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Server running on port ', this.port);
        });
    }
}
export default Server;