// hacer el import de express tradicional
// const express = require('express');

// hacer el nuevo import
const serverless = require('serverless-http');
const Express = require('express');
const Cors = require('cors');
const dotenv = require('dotenv');
const { conectarBD } = require('./db/db.js');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const rutasVehiculo = require('./views/vehiculos/rutas.js');
const rutasUsuario = require('./views/usuarios/rutas.js');
const rutasVenta = require('./views/ventas/rutas.js');
const autorizacionEstadoUsuario = require('./middleware/autorizacionEstadoUsuario.js');

dotenv.config({ path: './.env' });

const port = process.env.PORT || 5000;

const app = Express();

app.use(Express.json());
app.use(Cors());

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://misiontic-concesionario.us.auth0.com/.well-known/jwks.json',
  }),
  audience: 'api-autenticacion-concesionario-mintic',
  issuer: 'https://misiontic-concesionario.us.auth0.com/',
  algorithms: ['RS256'],
});

// 4 y 5: enviarle el token a auth0 para que devuelva si es valido o no
app.use(jwtCheck);

app.use(autorizacionEstadoUsuario);

app.use(rutasVehiculo);
app.use(rutasUsuario);
app.use(rutasVenta);

const main = () => {
  return app.listen(port, () => {
    console.log(`escuchando puerto ${port}`);
  });
};

module.exports.handler = serverless(conectarBD(main));
