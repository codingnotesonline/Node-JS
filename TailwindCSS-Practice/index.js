const express = require("express");
const mongodb = require("mongodb");
const mongoose = require("mongoose");
const hbs = require("hbs");
const path = require("path");
const port = process.env.PORT || 443;

const app = express();

app.use(express.json());

app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "views/partials"))

app.get("/", (req, resp) => {
    resp.render(path.join(__dirname, "views/public/index"));
});

app.get("/blog", (req, resp) => {
    resp.render(path.join(__dirname, "views/public/blog"));
});

app.get("/contact", (req, resp) => {
    resp.render(path.join(__dirname, "views/public/contact"));
});

app.listen(port);