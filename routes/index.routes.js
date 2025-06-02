import ejemplo from './practica.routes.js';
import tienda from './tienda.routes.js';
import { Router } from 'express';
const indexRoutes = Router();

indexRoutes.use('/ejemplo', ejemplo);
indexRoutes.use('/tienda', tienda);

export default indexRoutes;