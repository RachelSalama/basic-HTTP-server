"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const router_1 = require("./routes/router");
const server = (0, http_1.createServer)(router_1.handleRequest);
server.listen(4200, () => {
    console.log('Server is running on http://localhost:4200');
});
