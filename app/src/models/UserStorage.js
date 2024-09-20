"use strict";

const fs = require("fs").promises;

class UserStorage {
    static #getUserInfo(data, id) {
        const users = JSON.parse(data);
        const idx = users.id.indexOf(id);
        const usersKeys = Object.keys(users);
        const userInfo = usersKeys.reduce((newUser, info) => {
            newUser[info] = users[info][idx];
            return newUser;
        }, {});
        return userInfo;
    }

    static #getUsers(data, isAll, fields) {
        const users = JSON.parse(data);
        if (isAll) return users;
        const newUsers = fields.reduce((newUsers, field) => {
            if (users.hasOwnProperty(field)) {
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});
        return newUsers;
    }

    static getUsers(isAll, ...fields) {
        return fs
            .readFile("app/src/databases/users.json")
            .then((data) => {
                //data: 버퍼 데이터. 사용하려면 JSON.parse(data) 해줘야 함
                return this.#getUsers(data, isAll, fields);
            })
            .catch((err) => console.error(err));
    }

    static getUserInfo(id) {
        return fs
            .readFile("app/src/databases/users.json")
            .then((data) => {
                return this.#getUserInfo(data, id);
            })
            .catch((err) => console.error(err));
    }

    static async save(userInfo) {
        const users = await this.getUsers(true);
        if (users.id.includes(userInfo.id)) {
            throw "이미 존재하는 아이디입니다."; //Error()로 throw하면 object로 전달됨
        }
        users.id.push(userInfo.id);
        users.pw.push(userInfo.pw);
        users.name.push(userInfo.name);
        fs.writeFile("app/src/databases/users.json", JSON.stringify(users));
        return { success: true };
    }
}

module.exports = UserStorage;
