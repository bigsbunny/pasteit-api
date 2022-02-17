const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes.js")

const user = require("./models/url.js")

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use("/", routes);

app.listen(port, () => {
    console.log("Server started on port ", port);
})