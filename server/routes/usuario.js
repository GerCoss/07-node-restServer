//la libreria princiapal de nodejs
const express = require('express');

//se usa para encriptar la contrasena
const bcrypt = require('bcryptjs');

//en este caso se uso para la funcion pick
const _ = require('underscore');

//se solicita el modelo del esquema
const Usuario = require('../models/usuario');

const app = express();

//get se usa para solicitar una pagina
app.get('/usuario', function(req, res) {
    //query son para los parametros opcionales y lo obtiene desde la url
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    //obtiene la informacion de base de datos
    Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                });
            });

        });
});

//post se usa para crear nuevos registros
app.post('/usuario', function(req, res) {
    // body nos lo arroja la libreria bodyParser
    let body = req.body;

    //se pasan los parametros solicitados para posteriormente guardarlos en la DB
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        //ecripta password
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    //guardar en la base de datos
    //esta validacion sirve para mostrar al usuario de nuestra api mas informacion sobre los errores
    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        //usuarioDB.password = null;


        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

//put se usa para actualizar los datos
app.put('/usuario/:id', function(req, res) {
    //de esta manera se obtiene lo que se encuentra en el url
    let id = req.params.id;
    //la funcion pick permite asignar solo los campos solicitados
    let body = _.pick(req.body, ["nombre", "email", "img", "role", "estado"]);

    //Actualizar base de datos el new es para que me regrese el json actualizado y el runValidators es para que nos respete las restricciones del esquema
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

});

//delete se usa para borrar los datos
app.delete('/usuario/:id', function(req, res) {
    let id = req.params.id;

    let cambiaEstado = {
        estado: false
    };

    // //Se elimina por completo el usuario
    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }
        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    });
});

module.exports = app;