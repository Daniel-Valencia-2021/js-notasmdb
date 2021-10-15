const mongo = require('mongoose');
const {Schema} = mongo;

const NoteSchema = new Schema({
    titulo: {type: String, required: true},
    descripcion: {type: String, required: true},
    fecha: {type: Date, default: Date.now},
    user:{type: String}
});

module.exports =mongo.model('Nota', NoteSchema);

