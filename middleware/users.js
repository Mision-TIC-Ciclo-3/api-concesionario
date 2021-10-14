import jwt_decode from 'jwt-decode';
import {
  consultarOCrearUsuarioPorEmail,
  crearUsuario,
} from '../controllers/usuarios/controller.js';

const userMiddleware = async (req, res, next) => {
  //   const token = req.headers.authorization.split('Bearer ')[1];
  //   console.log('token', token);
  //   const usuario = jwt_decode(token)['http://localhost/user'];
  //   console.log('usuario', usuario);
  //   await consultarOCrearUsuarioPorEmail(usuario.email, async (err, result) => {
  //     if (!result) {
  //       console.log(result);
  //       await crearUsuario(usuario, (err, result) => {
  //         console.log(result);
  //       });
  //     }
  //   });
  next();
};

export default userMiddleware;
