const express = require('express');
var ObjectID = require('mongodb').ObjectID;

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require('../db/conn');

// This section will help you get a list of all the records.
recordRoutes.route('/vehicle').get(async function (req, res) {
  // Get records
  const dbConnect = dbo.getDb();

  dbConnect
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

// This section will help you create a new record.
recordRoutes.route('/vehicle/create').post(function (req, res) {
  const dbConnect = dbo.getDb();
  const vehicle = {
    name: req.body.name,
    brand: req.body.brand,
    model: req.body.model,
    created: new Date(),
  };

  dbConnect.collection('vehiculos').insertOne(vehicle, function (err, result) {
    if (err) {
      res.status(400).send('Error inserting vehicle!');
    } else {
      console.log(`Added a new vehicle with id ${result.insertedId}`);
      res.json({ id: result.insertedId });
    }
  });
});

// This section will help you update a record by id.
recordRoutes.route('/vehicle/update').patch(function (req, res) {
  const dbConnect = dbo.getDb();
  const vehicle = { _id: new ObjectID(req.body.id) };
  delete req.body.id;
  const updates = { $set: req.body };
  dbConnect
    .collection('vehiculos')
    .findOneAndUpdate(
      vehicle,
      updates,
      { new: true, upsert: true, returnOriginal: false },
      function (err, _result) {
        if (err) {
          res.status(400).send(`Error updating likes on listing with id ${vehicle.id}!`);
        } else {
          console.log('1 vehicle updated');
          res.json({ result: _result });
        }
      }
    );
});

// This section will help you delete a record
recordRoutes.route('/vehicle/delete').delete((req, res) => {
  // Delete documents
  const dbConnect = dbo.getDb();
  console.log(req.body.id);
  const vehicleQuery = { _id: new ObjectID(req.body.id) };

  dbConnect.collection('vehiculos').deleteOne(vehicleQuery, function (err, _result) {
    if (err) {
      res.status(400).send(`Error deleting listing with id ${vehicleQuery._id}!`);
    } else {
      console.log('1 document deleted');
      res.json({ status: 'deletion successful' });
    }
  });
});

module.exports = recordRoutes;
