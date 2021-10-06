import Express from 'express';
import { MongoClient } from 'mongodb';

const connectionString =
  'mongodb+srv://admin:admin@cluster0.jgqie.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

const app = Express();

app.use(Express.json());

const port = 5000;

app.get('/', (req, res) => {
  dbConnection
    .collection('vehiculos')
    .find({})
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send('Error fetching vehicles!');
      } else {
        res.json(result);
      }
    });
});

app.post('/vehiculo', (req, res) => {
  console.log(req.body);
  res.json({ test: 'hola' });
});

const connectToServer = (callback) => {
  client.connect(function (err, db) {
    if (err || !db) {
      return callback(err);
    }

    dbConnection = db.db('concesionario');
    console.log('Successfully connected to MongoDB.');
    return app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  });
};

connectToServer();
