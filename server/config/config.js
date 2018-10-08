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
//  Vencimiento del Token
// ==========================
// 60 segundos 
// 60 minutos
// 24 horas
// 30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// ==========================
//  SEED de autenticacion
// ==========================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

// ==========================
//  Base de datos
// ==========================
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    //variable controlada por heroku
    urlDB = process.env.MONGO_URL;
}
process.env.URLDB = urlDB;

// ==========================
//  Google Client ID
// ==========================

process.env.CLIENT_ID = process.env.CLIENT_ID || '504995581228-dcemb283svs28gfeft3iihqmndah3nj0.apps.googleusercontent.com';