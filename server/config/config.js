// ==========================
//  Puerto
// ==========================
//process es un objeto global que corre a lo largo de la aplicacion de node y se actualiza dependiendo del enviroment
process.env.PORT = process.env.PORT || 8081;

// ==========================
//  Entorno
// ==========================
//para saber si estoy en produccion
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ==========================
//  Base de datos
// ==========================
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URL;
}
process.env.URLDB = urlDB;