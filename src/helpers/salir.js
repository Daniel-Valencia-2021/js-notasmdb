const helpers ={};

helpers.isAuthenticated = (req, res, next)=>{
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'No estas registrado');
    res.redirect('/urlusers/ingresar');
};

module.exports = helpers;
