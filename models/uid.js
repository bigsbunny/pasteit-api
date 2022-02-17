const mongoose = require("mongoose");
require("dotenv").config();
const { v4: uuidv4 } = require('uuid');
const util = require('../util/utils')

const mongoURL = process.env.MONGODB_URI;

mongoose.connect(mongoURL, {useNewUrlParser: true, useUnifiedTopology: true}).then(res => {
    console.log(res);
})

const uidSchema = new mongoose.Schema({
    uid: String,
    date: { type: Date, default: Date.now() };
    validity: { type: Date, default: calculateValidity() }
});

const DataModel = mongoose.model('DataModel', uidSchema);

// let test = new DataModel({_id: uuidv4(), textData: "hello", tinyURL: "soemthing.com", date: new Date()});

// test.save((err, res) => {
//     if(err) console.log(err);
//     console.log(res);
//     mongoose.connection.close();
// })


module.exports = DataModel;