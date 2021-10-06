// hacer el import de express tradicional
// const express = require('express');

// hacer el nuevo import
import Express from 'express';

const app = Express();

app.use(Express.json());

app.get('/vehiculos', (req, res) => {
  console.log('alguien hizo get en la ruta /vehiculos');
  const vehiculos = [
    { nombre: 'corolla', marca: 'toyota', modelo: '2014' },
    { nombre: 'yaris', marca: 'toyota', modelo: '2020' },
    { nombre: 'fiesta', marca: 'ford', modelo: '2020' },
    { nombre: 'cx30', marca: 'mazda', modelo: '2020' },
  ];
  res.send(vehiculos);
});

app.post('/vehiculos/nuevo', (req, res) => {
  console.log(req);
  const datosVehiculo = req.body;
  console.log('llaves: ', Object.keys(datosVehiculo));
  try {
    if (
      Object.keys(datosVehiculo).includes('name') &&
      Object.keys(datosVehiculo).includes('brand') &&
      Object.keys(datosVehiculo).includes('model')
    ) {
      // implementar código para crear vehículo en la BD
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  } catch {
    res.sendStatus(500);
  }
});

app.listen(5000, () => {
  console.log('escuchando puerto 5000');
});
