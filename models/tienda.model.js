import mongoose from 'mongoose';

const tiendaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    precio: [{
        type: String,
        required: true
    }],
    caracteristicas: {
        type: String,
        required: true
    }
});

const Tienda = mongoose.model('Tienda', tiendaSchema);

export default Tienda;
