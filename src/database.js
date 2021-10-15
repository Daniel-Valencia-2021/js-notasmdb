const mongo = require('mongoose');
mongo.set('debug',true);

mongo.connect('mongodb://localhost/proyecto-notas', {
   /* useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false*/
    useNewUrlParser: true,
    useUnifiedTopology: true, 
})

.then(db => console.log('Conectado'))
.catch(err => console.error(err));

