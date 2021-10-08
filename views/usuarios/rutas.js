import Express from 'express';
import {
  queryAllUsers,
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
  consultarUsuario,
} from '../../controllers/usuarios/controller.js';

const rutasUsuario = Express.Router();

const genercCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send('Error consultando los usuarios');
  } else {
    res.json(result);
  }
};

rutasUsuario.route('/usuarios').get((req, res) => {
  console.log('alguien hizo get en la ruta /usuarios');
  queryAllUsers(genercCallback(res));
});

rutasUsuario.route('/usuarios').post((req, res) => {
  crearUsuario(req.body, genercCallback(res));
});

rutasUsuario.route('/usuarios/:id').get((req, res) => {
  console.log('alguien hizo get en la ruta /usuarios');
  consultarUsuario(req.params.id, genercCallback(res));
});

rutasUsuario.route('/usuarios/:id').patch((req, res) => {
  editarUsuario(req.params.id, req.body, genercCallback(res));
});

rutasUsuario.route('/usuarios/:id').delete((req, res) => {
  eliminarUsuario(req.params.id, genercCallback(res));
});

export default rutasUsuario;
