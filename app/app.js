"use strict";

//nodemon app/bin/www.js

//module
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const path = require("path");

// routing
const home = require("./src/routes/home");

app.set("views", __dirname + "/src/views");
app.set("view engine", "ejs");

// use =>미들 웨어를 등록
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname + "/src/public")));

app.use("/", home);

module.exports = app;
