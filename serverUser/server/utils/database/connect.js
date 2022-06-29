const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');



const mongoDb = process.env.DB_URL;

const connect = async() => {
    try{
        const db = await mongoose.connect(mongoDb, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        const {name, host} = db.connection;
        console.log(`Connected to DB: ${name}, in host: ${host}`);
    }
    catch(error){
        console.log('Error to connect with DB', error);
    }
}

module.exports = { connect };