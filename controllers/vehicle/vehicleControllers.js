import { getDB } from '../../db/db.js';
import { ObjectId } from 'mongodb';

const getAllVehicles = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('vehiculo').find().limit(50).toArray(callback);
};

const createVehicle = async (datosVehiculo, callback) => {
  const baseDeDatos = getDB();
  console.log('llaves: ', Object.keys(datosVehiculo));
  if (
    Object.keys(datosVehiculo).includes('name') &&
    Object.keys(datosVehiculo).includes('brand') &&
    Object.keys(datosVehiculo).includes('model')
  ) {
    await baseDeDatos.collection('vehiculo').insertOne(datosVehiculo, callback);
  } else {
    return { err: 'conditions not met', result: '' };
  }
};

const editVehicle = async (vehicleId, data, callback) => {
  const filtroVehiculo = { _id: new ObjectId(vehicleId) };
  const operacion = {
    $set: data,
  };
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection('vehiculo')
    .findOneAndUpdate(filtroVehiculo, operacion, { upsert: true, returnOriginal: true }, callback);
};

const deleteVehicle = async (vehicleId, callback) => {
  const filtroVehiculo = { _id: new ObjectId(vehicleId) };
  const baseDeDatos = getDB();
  await baseDeDatos.collection('vehiculo').deleteOne(filtroVehiculo, callback);
};

export { getAllVehicles, createVehicle, editVehicle, deleteVehicle };
