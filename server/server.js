//solicita el puerto que se utilizara
require('./config/config');

//la libreria princiapal de nodejs
const express = require('express');
//libreria de la base de datos mongoose
const mongoose = require('mongoose');

const app = express();

//permite obtener la informacion enviada por un html y lo pasa al formato json
const bodyParser = require('body-parser');
//siempre que se ve app.use significa que son midlewares
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())

//Se solicita las rutas de la app
app.use(require('./routes/usuario'));

//Se realiza la conexion a la base de datos se debe colocar el puerto que usa mongo
mongoose.connect(process.env.URLDB, (err, res) => {
    if (err) throw err;
    console.log('Base de datos online');
});

app.listen(process.env.PORT, () => {
    console.log('escuchando puerto: ', process.env.PORT);
});