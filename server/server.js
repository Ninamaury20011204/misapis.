import express from 'express';
import cors from 'cors';
import indexRoutes from '../routes/index.routes.js'
import * as db from '../db/cnn_mongodb.js';

export default class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 4000;
        this.generalRoute = '/api/';

        this.conectarDBMongo();
        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDBMongo(){

        if(!db.isConected){
            await db.conectarAMongoDB();
        }
    }

    middlewares(){
        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio público
        this.app.use(express.static('public'));
    }
    
    routes(){
        this.app.use(this.generalRoute, indexRoutes);
    }


    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', `${this.port}`.yellow);
        });
    }

}
