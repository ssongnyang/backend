"use strict";

const { resolveInclude } = require("ejs");

const User = require("../../models/User");

const output = {
    home: (req, res) => {
        res.render("home/index");
    },

    login: (req, res) => {
        res.render("home/login");
    },

    register: (req, res) => {
        res.render("home/register");
    },
};

const process = {
    login: async (req, res) => {
        const user = new User(req.body);
        const response = await user.login();
        // console.log(response);
        return res.json(response);
    },

    register: async (req, res) => {
        const user = new User(req.body);
        try {
            const response = await user.register();
            return res.json(response);
        } catch (err) {
            console.error(err);
        }
    },
};

module.exports = {
    output,
    process,
};
