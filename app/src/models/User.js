"use strict";

const UserStorage = require("./UserStorage");

class User {
    constructor(body) {
        this.body = body;
    }

    async login() {
        const client = this.body;
        const { id, pw } = await UserStorage.getUserInfo(client.id);
        if (id) {
            if (id == client.id && pw == client.pw) {
                return { success: true };
            }
            return { success: false, msg: "wrong password" };
        }
        return { success: false, msg: "no id" };
    }

    async register() {
        const client = this.body;
        try {
            const response = await UserStorage.save(client);
            return response;
        } catch (err) {
            return { success: false, msg: err };
        }
    }
}

module.exports = User;
