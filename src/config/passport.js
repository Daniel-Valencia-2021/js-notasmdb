const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/users-model');

passport.use(new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'passw'
}, async (correo, passw, done) =>{
   const user = await User.findOne({correo: correo});
   if (!user) {
       return done(null, false, {message: 'Correo no encontrado'});
   }else{
       const valid = await user.validPassword(passw);

       if (valid) {
           return done(null, user);
       }else{
           return done(null, false, {message: 'Contraseña incorrecta'})
       }
   }
}));

passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser((id, done)=>{
    User.findById(id, (err, user)=>{
        done(err, user);
    })
});


