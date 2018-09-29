const jwt = require('jsonwebtoken');

// ==========================
//  Verificar Token
// ==========================

//sin no se llama al next no continuara con la ejecucion posterior al middleware
let verificaToken = (req, res, next) => {
    //se obtiene la informacion del header
    let token = req.get('Authorization');

    //verifica si el token coincide con el de la base de datos
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            //401 error no autorizado
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'token no valido'
                }
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
};

// ==========================
//  Verificar Admin_Role
// ==========================
let verificaAdmin_Role = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    }
};

module.exports = {
    verificaToken,
    verificaAdmin_Role
};