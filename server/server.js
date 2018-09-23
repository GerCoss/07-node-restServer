//solicita el puerto que se utilizara
require('./config/config');

//la libreria princiapal de nodejs
const express = require('express');
const app = express();

//permite obtener la informacion enviada por un html y lo pasa al formato json
const bodyParser = require('body-parser');
//siempre que se ve app.use significa que son midlewares
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())

//get se usa para solicitar una pagina
app.get('/usuario', function(req, res) {
    res.json('get usuario');
});

//post se usa para crear nuevos registros
app.post('/usuario', function(req, res) {
    // body nos lo arroja la libreria bodyParser
    let body = req.body;

    //esta validacion sirve para mostrar al usuario de nuestra api mas informacion sobre los errores en este caso es lo que se envia al la peticion post
    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'el nombre es necesario'
        });
    } else {
        res.json({
            body
        });
    }

});

//put se usa para actualizar los datos
app.put('/usuario/:id', function(req, res) {
    //de esta manera se obtiene lo que se encuentra en el url
    let id = req.params.id;

    res.json({
        id
    });
});

//delete se usa para borrar los datos
app.delete('/usuario', function(req, res) {
    res.json('delete usuario');
});


app.listen(process.env.PORT, () => {
    console.log('escuchando puerto: ', process.env.PORT);
});