const express = require('express');
const router = express.Router();

router.post("/", (req, res) =>{
    console.log(req);
})

router.get("/login", (req, res) => {
    res.send("hello");
});

// router.get("/profile", (req, res) => {

// })

module.exports = router;
