//la libreria princiapal de nodejs
const express = require('express');

//se usa para encriptar la contrasena
const bcrypt = require('bcryptjs');

//se usa para generar el token
const jwt = require('jsonwebtoken');

//se solicita el modelo del esquema
const Usuario = require('../models/usuario');

const app = express();

app.post('/login', (req, res) => {

    let body = req.body;

    //solo regresara uno de la base de datos
    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: '(Usuario) o contrasena incorrectos'
                }
            });
        }
        //compara si la contrasena coinciden
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o (contrasena) incorrectos'
                }
            });
        }

        //el token durara 30 dias
        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });
    });

});

module.exports = app;