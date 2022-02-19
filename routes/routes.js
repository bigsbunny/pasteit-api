const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const DataModel = require('../models/url.js')
const util = require('../util/utils')
const axios = require('axios');

router.get("/", (req, res) => {
    res.status(200).json({"response": "successful"})
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

router.get("/pastes", (req, res) => {
    let currentTimeStamp = new Date();
    DataModel.find({ validity: {$gt: currentTimeStamp} }).then((response => {
        res.status(200).json(response)
    }))
})

router.get("/:paste_id", (req, res) => {
    // console.log(req.socket.remoteAddress);
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
    const currentTimeStamp = new Date().getTime();
    DataModel.findOneAndUpdate({ shortID: req.params.paste_id}, { $push: {clientIps: {ip: ip, timestamp: currentTimeStamp}}}).then((response) => {
        DataModel.find({ shortID: req.params.paste_id }).then((response) => {
            res.json(response);
        });
    })
    // DataModel.find({ shortID: req.params.paste_id }).then((response) => {
    //     res.json(response);
    // });
});

router.post("/:paste_id", (req, res) => {
    DataModel.find({ shortID: req.params.paste_id, encryptionKey: req.body.encryptKey}).then((response) => {
        // console.log(response[0]);
        if(response[0].encryptionKey === req.body.encryptKey)
        {
            // console.log(response[0].textData);
            axios.post('https://classify-web.herokuapp.com/api/decrypt', {
                "data": response[0].textData, 
                "key": response[0].encryptionKey
            }).then((r) => {
                // console.log(r.data);
                res.status(200).json({_id: response[0]._id, textData: r.data.result, tinyURL: response[0].tinyURL, shortID: response[0].shortID, date: response[0].date, validity: response[0].validity, toEncrypt: response[0].toEncrypt });
            })
        }
    })
});

router.get("/delete/:paste_id", (req, res) => {
    // console.log(req.params);
    DataModel.deleteOne({ shortID: req.params.paste_id }).then((response) => {
        res.status(200).json({"status": "deleted"})
    }).catch((err) => {
        console.error(err);
    })
})

router.get("/views/:paste_id", (req, res) => {
    DataModel.find({ shortID: req.params.paste_id }).then((response) => {
        console.log(response[0].clientIps);
        res.status(200).json(response[0].clientIps);
    })
})

router.post("/update/:paste_id", (req, res) => {
    // console.log(req.body);
    DataModel.find({shortID: req.params.paste_id}).then((response) => {
        let currentValidity = response[0].validity;
        DataModel.findOneAndUpdate({ shortID: req.params.paste_id }, {$set: {validity: new Date(currentValidity.getTime() + (req.body.extend*1000))}}).then((response) => {
            res.status(200).json({"update": "success"});
        })
    })

});


module.exports = router;
