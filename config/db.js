//Import the mongoose module
const mongoose = require('mongoose');

//Set up default mongoose connection
exports.connectDB = () =>  {
    const mongoDB = 'mongodb://127.0.0.1/my_database100';
    mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
    console.log('connect db success!!!')
}