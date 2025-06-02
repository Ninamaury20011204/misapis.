import { Router } from 'express';
import {
    getAllTiendas,
    getTiendaById,
    postTienda,
    putTienda,
    deleteTienda
} from '../controllers/tienda.controller.js';

const tienda = Router();

tienda.get('/', getAllTiendas);

tienda.get('/:id', getTiendaById);

tienda.post('/', postTienda);

tienda.put('/:id', putTienda);

tienda.delete('/:id', deleteTienda);

export default tienda;
