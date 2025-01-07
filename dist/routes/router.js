"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRequest = handleRequest;
const controller_1 = require("../controller/controller");
function handleRequest(req, res) {
    if (req.method === 'GET' && req.url === '/content') {
        (0, controller_1.contentController)(req, res);
    }
    else if (req.method === 'GET' && req.url === '/updateTime') {
        (0, controller_1.updateTimeController)(req, res);
    }
    else {
        res.statusCode = 404;
        res.end('Not Found');
    }
}
