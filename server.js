// hacer el import de express tradicional
// const express = require('express');

// hacer el nuevo import
import dotenv from 'dotenv';
import Express from 'express';
import rutasVehiculo from './views/vehicle/routes.js';
import Cors from 'cors';
import { connectServer } from './db/db.js';

dotenv.config({ path: './.env' });

const app = Express();

app.use(Express.json());
app.use(Cors());
app.use(rutasVehiculo);

const main = () => {
  return app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`);
  });
};

connectServer(main);
