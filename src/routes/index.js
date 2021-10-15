// aca las url de las paginas principales
const rutas = require('express').Router();

rutas.get('/', (req, res) => {
    res.render('index.hbs');
});

rutas.get('/about', (req, res) => {
    res.render('about.hbs');
});
module.exports=rutas;



