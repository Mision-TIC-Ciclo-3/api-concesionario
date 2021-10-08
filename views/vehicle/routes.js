import Express from 'express';
import {
  createVehicle,
  deleteVehicle,
  editVehicle,
  getAllVehicles,
} from '../../controllers/vehicle/vehicleControllers.js';

const rutasVehiculo = Express.Router();

const genericCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send(err);
  } else {
    res.json(result);
  }
};

rutasVehiculo.route('/vehiculos').get((req, res) => {
  getAllVehicles(genericCallback(res));
});

rutasVehiculo.route('/vehiculos').post((req, res) => {
  createVehicle(req.body, genericCallback(res));
});

rutasVehiculo.route('/vehiculos/:id').patch((req, res) => {
  editVehicle(req.params.id, req.body, genericCallback(res));
});

rutasVehiculo.route('/vehiculos/:id').delete((req, res) => {
  deleteVehicle(req.params.id, genericCallback(res));
});

export default rutasVehiculo;
