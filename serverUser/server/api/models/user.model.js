const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

let userSchema = new Schema ({
    email: { type: String, unique: true },
    password: { type: String }
},
{
    collection: 'users'
})

//Le indicamos a través del campo unique en el Schema que nos lo valide gracias al plugin 
//instalado y su mensaje al matchearlo si existiera
userSchema.plugin(uniqueValidator, { message: 'Error to register'});

module.exports = mongoose.model('User', userSchema);