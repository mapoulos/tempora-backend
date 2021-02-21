"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data = require('./data.json');
exports.default = async () => {
    return {
        statusCode: 200,
        body: data
    };
};
