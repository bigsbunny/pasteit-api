const mongoose = require("mongoose");
require("dotenv").config();
const { v4: uuidv4 } = require('uuid');
const util = require('../util/utils')

const mongoURL = process.env.MONGODB_URI;

mongoose.connect(mongoURL, {useNewUrlParser: true, useUnifiedTopology: true}).then(res => {
    console.log(res);
})

const urlSchema = new mongoose.Schema({
    _id: String,
    textData: String,
    tinyURL: String,
    shortID: String,
    date: { type: Date, default: Date.now() },
    validity: { type: Date, default: util.calculateValidity() },
    toEncrypt: Boolean,
    encryptionKey: String
});

const DataModel = mongoose.model('DataModel', urlSchema);


module.exports = DataModel;