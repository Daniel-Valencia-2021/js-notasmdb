const mongo = require('mongoose');
const {Schema} = mongo;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    nombre: {type: String, required: true},
    correo: {type: String, required: true},
    passw: {type: String, required: true},
    fecha: {type: Date, default: Date.now}
});


UserSchema.method('encryptPassword', async function(passw){
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(passw, salt);
    return hash;
});

UserSchema.method('validPassword', async function(passw){
    return await bcrypt.compare(passw, this.passw);
});


/*UserSchema.method.ecryptPassword = async (passw) =>{
const salt = await bcrypt.genSalt(10);
const hash = bcrypt.hash(passw, salt);
return hash;
}*/

/*
UserSchema.method.matchPassword = async function (passw){
    return await bcrypt.compare(passw, this.passw);

}*/

module.exports = mongo.model('User', UserSchema)

