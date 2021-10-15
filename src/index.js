//creacion y configuracion del servidor

// inicializa los modulos necearios previamente instalados
const express = require('express');
const path = require('path');
const exphdb = require('express-handlebars');
const methodOVR = require('method-override');
const sessions = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

//inicializacion
const app = express(); 
require('./database'); 
require('./config/passport');

//settings 
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views')); 
app.engine('.hbs', exphdb({
     defaultLayout: 'main',
     runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }, 
     layoutsDir: path.join(app.get('views'), 'layouts'), 
     partialsDir: path.join(app.get('views'), 'partials'),
     extname: '.hbs'
 }));

 app.set('views engine', '.hbs');

//middlewares: aca se ejecuntan todas las funciones antes de pasar
app.use(express.urlencoded({extended: false}));
app.use(methodOVR('_method'));
app.use(sessions({ //permiten auntenticar al usuarios
    secret: 'Sapp',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//variebles globales: los dajos que utilizara toda la app

app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg');//---
    res.locals.error_msg = req.flash('error_msg');//---
    res.locals.edit_msg = req.flash('edit_msg');
    res.locals.delete_msg = req.flash('delete_msg');
    res.locals.regis_msg = req.flash('regis_msg');//-----
    res.locals.error = req.flash('error');//---
    res.locals.user = req.user || null;//---
    next();
})

//rutas
app.use(require('./routes/index'));
app.use(require('./routes/urlnotes'));
app.use(require('./routes/urlusers'));

//static files
app.use(express.static(path.join(__dirname, 'public')));

//server start
app.listen(app.get('port'), () => {console.log('Server on port', app.get('port'))});


