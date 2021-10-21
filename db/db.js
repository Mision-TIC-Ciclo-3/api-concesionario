const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const stringConexion = process.env.DATABASE_URL;

const client = new MongoClient(stringConexion, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let baseDeDatos;

const conectarBD = (callback) => {
  client.connect((err, db) => {
    if (err) {
      console.error('Error conectando a la base de datos');
      return 'error';
    }
    baseDeDatos = db.db('concesionario');
    console.log('baseDeDatos exitosa');
    return callback();
  });
};

const getDB = () => {
  return baseDeDatos;
};

module.exports = { conectarBD, getDB };
