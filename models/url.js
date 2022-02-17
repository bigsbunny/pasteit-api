const mongoose = require("mongoose");
require("dotenv").config();
const { v4: uuidv4 } = require('uuid');

const mongoURL = process.env.MONGODB_URI;

mongoose.connect(mongoURL, {useNewUrlParser: true, useUnifiedTopology: true}).then(res => {
    console.log(res);
})

const urlSchema = new mongoose.Schema({
    _id: String,
    textData: String,
    tinyURL: String,
    date: { type: Date, default: Date.now() }
});

const DataModel = mongoose.model('DataModel', urlSchema);

let test = new DataModel({_id: uuidv4(), textData: "hello", tinyURL: "soemthing.com", date: new Date()});

test.save((err, res) => {
    if(err) console.log(err);
    console.log(res);
    mongoose.connection.close();
})


module.exports = DataModel;