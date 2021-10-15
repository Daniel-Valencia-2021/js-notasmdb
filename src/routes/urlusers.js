// url de los modulos de registro e inicios de secion
const rutas = require('express').Router();
const UserM = require('../models/users-model');
const passport = require('passport');

rutas.get('/urlusers/ingresar', (req, res) => {
    res.render('f-usuarios/ingresar.hbs');
});

rutas.post('/urlusers/ingresar', passport.authenticate('local', {
    successRedirect: '/urlnotes',
    failureRedirect: '/urlusers/ingresar',
    failureFlash: true
}));


//Registro de usuarios
rutas.get('/urlusers/registro', (req, res) => {
    res.render('f-usuarios/registrar.hbs');
});

rutas.post('/urlusers/registro', async (req, res) =>{
    const {nombre, correo, passw, confirm_passw} = req.body;
    const errors = [];
    
    if (nombre.length<=0) {
        errors.push({text: 'Por favor ingres un nombre'})
        console.log(errors)
    }
    if (passw != confirm_passw) {
        errors.push({text: 'Las contraseñas no son iguales'});
        console.log(errors)

    }
    if (errors.length > 0) {
        res.render('f-usuarios/registrar.hbs', {errors, nombre, correo, passw, confirm_passw})
        console.log(errors)

    }else{
        const correoUser = await UserM.findOne({correo: correo});
        console.log(errors)
        console.log(correoUser)

        if (correoUser) {
            req.flash('error_msg', 'Este correo ya existe');
            res.redirect('/urlusers/registro')
            console.log(errors)

        }else{
            const newUser = new UserM({nombre, correo, passw});
            newUser.passw = await newUser.encryptPassword(passw);
            await newUser.save();

            req.flash('regis_msg', 'Usuario Registrado');
            res.redirect('/urlusers/ingresar');
            console.log(errors)

        }
    }
});

rutas.get('/urluser/salir', (req, res) =>{
    req.logout();
    res.redirect('/');
});

module.exports=rutas;


