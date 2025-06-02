import Tienda from '../models/tienda.model.js';
import mongoose from 'mongoose';
import express from 'express';


export const getAllTiendas = async (req, res) => {
    console.log('Obtiene todas las tiendas');
    try {
        const tiendas = await Tienda.find({}, { __v: 0 });
        if (tiendas.length === 0) {
            return res.status(404).json({
                msg: 'No se encontraron tiendas'
            });
        }
        return res.status(200).json({ tiendas });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al obtener las tiendas'
        });
    }
};


export const getTiendaById = async (req, res) => {
    console.log('TIENDA POR ID');
    const id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'ID no válido'
            });
        }
        const tienda = await Tienda.findById(id);
        if (!tienda) {
            return res.status(404).json({
                msg: 'Tienda no encontrada'
            });
        }
        return res.status(200).json({ tienda });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al obtener la tienda'
        });
    }
};


export const postTienda = async (req, res) => {
    console.log('POST TIENDA');
    const body = req.body;
    const tienda = new Tienda(body);
    try {
        const validationError = tienda.validateSync();
        if (validationError) {
            const errorMessages = Object.values(validationError.errors).map(error => error.message);
            return res.status(400).json({ error: errorMessages });
        }
        await tienda.save();
        return res.status(201).json({ tienda });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al guardar la tienda'
        });
    }
};


export const putTienda = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'ID no válido'
            });
        }
        const tienda = await Tienda.findByIdAndUpdate(id, body, { new: true, runValidators: true });
        if (!tienda) {
            return res.status(404).json({
                msg: 'Tienda no encontrada'
            });
        }
        return res.status(200).json({ tienda });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al actualizar la tienda'
        });
    }
};


export const deleteTienda = async (req, res) => {
    console.log('DELETE TIENDA');
    const id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'ID no válido'
            });
        }
        const tienda = await Tienda.findByIdAndDelete(id);
        if (!tienda) {
            return res.status(404).json({
                msg: 'Tienda no encontrada'
            });
        }
        return res.status(200).json({
            msg: 'Tienda eliminada',
            tienda
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al eliminar la tienda'
        });
    }
};
