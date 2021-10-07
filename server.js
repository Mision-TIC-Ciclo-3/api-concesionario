// hacer el import de express tradicional
// const express = require('express');

// hacer el nuevo import
import Express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import Cors from 'cors';

const stringConexion = '';

const client = new MongoClient(stringConexion, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let baseDeDatos;

const app = Express();

app.use(Express.json());
app.use(Cors());

app.get('/vehiculos', (req, res) => {
  console.log('alguien hizo get en la ruta /vehiculos');
  baseDeDatos
    .collection('vehiculo')
    .find()
    .limit(50)
    .toArray((err, result) => {
      if (err) {
        res.status(500).send('Error consultando los vehiculos');
      } else {
        res.json(result);
      }
    });
});

app.post('/vehiculos/nuevo', (req, res) => {
  console.log(req);
  const datosVehiculo = req.body;
  console.log('llaves: ', Object.keys(datosVehiculo));
  try {
    if (
      Object.keys(datosVehiculo).includes('name') &&
      Object.keys(datosVehiculo).includes('brand') &&
      Object.keys(datosVehiculo).includes('model')
    ) {
      // implementar código para crear vehículo en la BD
      baseDeDatos.collection('vehiculo').insertOne(datosVehiculo, (err, result) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          console.log(result);
          res.sendStatus(200);
        }
      });
    } else {
      res.sendStatus(500);
    }
  } catch {
    res.sendStatus(500);
  }
});

app.patch('/vehiculos/editar', (req, res) => {
  const edicion = req.body;
  console.log(edicion);
  const filtroVehiculo = { _id: new ObjectId(edicion.id) };
  delete edicion.id;
  const operacion = {
    $set: edicion,
  };
  baseDeDatos
    .collection('vehiculo')
    .findOneAndUpdate(
      filtroVehiculo,
      operacion,
      { upsert: true, returnOriginal: true },
      (err, result) => {
        if (err) {
          console.error('error actualizando el vehiculo: ', err);
          res.sendStatus(500);
        } else {
          console.log('actualizado con exito');
          res.sendStatus(200);
        }
      }
    );
});

app.delete('/vehiculos/eliminar', (req, res) => {
  const filtroVehiculo = { _id: new ObjectId(req.body.id) };
  baseDeDatos.collection('vehiculo').deleteOne(filtroVehiculo, (err, result) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

const main = () => {
  client.connect((err, db) => {
    if (err) {
      console.error('Error conectando a la base de datos');
      return 'error';
    }
    baseDeDatos = db.db('concesionario');
    console.log('baseDeDatos exitosa');
    return app.listen(5000, () => {
      console.log('escuchando puerto 5000');
    });
  });
};

main();
