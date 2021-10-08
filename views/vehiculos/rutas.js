import Express from 'express';
import {
  queryAllVehicles,
  crearVehiculo,
  editarVehiculo,
  eliminarVehiculo,
} from '../../controllers/vehiculos/controller.js';
import { getDB } from '../../db/db.js';

const rutasVehiculo = Express.Router();

const genercCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send('Error consultando los vehiculos');
  } else {
    res.json(result);
  }
};

rutasVehiculo.route('/vehiculos').get((req, res) => {
  console.log('alguien hizo get en la ruta /vehiculos');
  queryAllVehicles(genercCallback(res));
});

rutasVehiculo.route('/vehiculos').post((req, res) => {
  crearVehiculo(req.body, genercCallback(res));
});

rutasVehiculo.route('/vehiculos/:id').patch((req, res) => {
  editarVehiculo(req.params.id, req.body, genercCallback(res));
});

rutasVehiculo.route('/vehiculos/:id').delete((req, res) => {
  eliminarVehiculo(req.params.id, genercCallback(res));
});

export default rutasVehiculo;
