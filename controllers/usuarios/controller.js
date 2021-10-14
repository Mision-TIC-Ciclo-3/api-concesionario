import { ObjectId } from 'mongodb';
import jwt_decode from 'jwt-decode';
import { getDB } from '../../db/db.js';

const queryAllUsers = async (callback) => {
  const baseDeDatos = getDB();
  console.log('query');
  await baseDeDatos.collection('usuario').find({}).limit(50).toArray(callback);
};

const crearUsuario = async (datosUsuario, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('usuario').insertOne(datosUsuario, callback);
};

const consultarUsuario = async (id, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('usuario').findOne({ _id: new ObjectId(id) }, callback);
};

const consultarOCrearUsuarioPorEmail = async (req, callback) => {
  const token = req.headers.authorization.split('Bearer ')[1];
  const usuario = jwt_decode(token)['http://localhost/user'];
  const baseDeDatos = getDB();
  await baseDeDatos.collection('usuario').findOne({ email: usuario.email }, async (err, res) => {
    if (res) {
      callback(err, res);
    } else {
      usuario._idAuth0 = usuario._id;
      delete usuario._id;
      await crearUsuario(usuario, (err, res) => callback(err, usuario));
    }
  });
};

const editarUsuario = async (id, edicion, callback) => {
  console.log('id', id, 'edicion', edicion);
  const filtroUsuario = { _id: new ObjectId(id) };
  const operacion = {
    $set: edicion,
  };
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection('usuario')
    .findOneAndUpdate(filtroUsuario, operacion, { upsert: true, returnOriginal: true }, callback);
};

const eliminarUsuario = async (id, callback) => {
  const filtroUsuario = { _id: new ObjectId(id) };
  const baseDeDatos = getDB();
  await baseDeDatos.collection('usuario').deleteOne(filtroUsuario, callback);
};

export {
  queryAllUsers,
  crearUsuario,
  consultarUsuario,
  editarUsuario,
  eliminarUsuario,
  consultarOCrearUsuarioPorEmail,
};
