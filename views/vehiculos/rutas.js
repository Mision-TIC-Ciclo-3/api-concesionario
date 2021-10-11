import Express from 'express';
import {
  queryAllVehicles,
  crearVehiculo,
  editarVehiculo,
  eliminarVehiculo,
  consultarVehiculo,
} from '../../controllers/vehiculos/controller.js';
import jwt from 'express-jwt';
import jwtAuthz from 'express-jwt-authz';
import jwksRsa from 'jwks-rsa';

// Authorization middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
export const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://test-misiontic.us.auth0.com/.well-known/jwks.json`,
  }),

  // Validate the audience and the issuer.
  audience: 'autenticacion-test-misiontic',
  issuer: [`https://test-misiontic.us.auth0.com/`],
  algorithms: ['RS256'],
});

const rutasVehiculo = Express.Router();

const genercCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send('Error consultando los vehiculos');
  } else {
    res.json(result);
  }
};

rutasVehiculo.route('/vehiculos').get(checkJwt, (req, res) => {
  console.log('alguien hizo get en la ruta /vehiculos');
  queryAllVehicles(genercCallback(res));
});

rutasVehiculo.route('/vehiculos').post((req, res) => {
  crearVehiculo(req.body, genercCallback(res));
});

rutasVehiculo.route('/vehiculos/:id').get((req, res) => {
  console.log('alguien hizo get en la ruta /vehiculos');
  consultarVehiculo(req.params.id, genercCallback(res));
});

rutasVehiculo.route('/vehiculos/:id').patch((req, res) => {
  editarVehiculo(req.params.id, req.body, genercCallback(res));
});

rutasVehiculo.route('/vehiculos/:id').delete((req, res) => {
  eliminarVehiculo(req.params.id, genercCallback(res));
});

export default rutasVehiculo;
