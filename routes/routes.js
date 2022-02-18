const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const DataModel = require('../models/url.js')
const util = require('../util/utils')
const axios = require('axios');

router.get("/", (req, res) => {
    res.send("hello");
});

router.post("/", (req, res) => {
    console.log(`body = ${req.body}`);
    let inputData = req.body.data;
    let toEncrypt = req.body.encrypt;
    let encryptKey = req.body.encryptKey;
    console.log(inputData, toEncrypt, encryptKey);
    let uid = uuidv4();

    if (inputData === "")
        return res.status(400).json({ error: "Content missing" });

    else {
        let shortID = util.generateShortID().substring(0, 6);
        if (!toEncrypt) {
            let dbEntry = new DataModel({ _id: uid, textData: inputData, tinyURL: process.env.CLIENT + "/" + shortID, shortID: shortID, date: new Date(), validity: util.calculateValidity(), toEncrypt: toEncrypt, encryptionKey: encryptKey });
            dbEntry.save((err, res) => {
                if (err) console.log(err);
            });
            res.send(dbEntry);
        }
        else {
            console.log("ENCRYPT");
            axios.post('https://classify-web.herokuapp.com/api/encrypt', {
                "data": inputData,
                "key": encryptKey
            }).then((response) => {
                let dbEntry = new DataModel({ _id: uid, textData: response.data.result, tinyURL: process.env.CLIENT + "/" + shortID, shortID: shortID, date: new Date(), validity: util.calculateValidity(), toEncrypt: toEncrypt, encryptionKey: encryptKey });
                dbEntry.save((err, res) => {
                    if (err) console.log(err);
                });
                res.send(dbEntry);
            })
            // let encrypted = util.encryptData(inputData, encryptKey)
            // let dbEntry = new DataModel({ _id: uid, textData: encrypted, tinyURL: process.env.CLIENT + "/" + shortID, shortID: shortID, date: new Date(), validity: util.calculateValidity(), toEncrypt: toEncrypt, encryptionKey: encryptKey });
            // dbEntry.save((err, res) => {
            //     if (err) console.log(err);
            // });
            // res.send(dbEntry);
        }

    }
})

router.get("/login", (req, res) => {
    res.send("hello");
});

// router.get("/profile", (req, res) => {

// })

router.get("/:paste_id", (req, res) => {
    // console.log(req.params.paste_id);
    DataModel.find({ shortID: req.params.paste_id }).then((response) => {
        res.json(response);
    });
});

router.post("/:paste_id", (req, res) => {
    console.log(req.body);
});

module.exports = router;
