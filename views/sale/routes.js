import Express from 'express';
import {
  createSale,
  deleteSale,
  editSale,
  getAllSales,
} from '../../controllers/sale/saleControllers.js';

const rutasUsuario = Express.Router();

const genericCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send(err);
  } else {
    res.json(result);
  }
};

rutasUsuario.route('/ventas').get((req, res) => {
  getAllSales(genericCallback(res));
});

rutasUsuario.route('/ventas').post((req, res) => {
  createSale(req.body, genericCallback(res));
});

rutasUsuario.route('/ventas/:id').patch((req, res) => {
  editSale(req.params.id, req.body, genericCallback(res));
});

rutasUsuario.route('/ventas/:id').delete((req, res) => {
  deleteSale(req.params.id, genericCallback(res));
});

export default rutasUsuario;
