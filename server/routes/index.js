//la libreria princiapal de nodejs
const express = require('express');

const app = express();

//Se solicita las rutas de la app
app.use(require('./usuario'));
app.use(require('./login'));

module.exports = app;