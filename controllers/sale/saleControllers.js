import { getDB } from '../../db/db.js';
import { ObjectId } from 'mongodb';

const getAllSales = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('venta').find().limit(50).toArray(callback);
};

const createSale = async (datosUsuario, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('venta').insertOne(datosUsuario, callback);
};

const editSale = async (vehicleId, data, callback) => {
  const filtroUsuario = { _id: new ObjectId(vehicleId) };
  const operacion = {
    $set: data,
  };
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection('venta')
    .findOneAndUpdate(filtroUsuario, operacion, { upsert: true, returnOriginal: true }, callback);
};

const deleteSale = async (vehicleId, callback) => {
  const filtroUsuario = { _id: new ObjectId(vehicleId) };
  const baseDeDatos = getDB();
  await baseDeDatos.collection('venta').deleteOne(filtroUsuario, callback);
};

export { getAllSales, createSale, editSale, deleteSale };
