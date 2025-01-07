"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContentFromFile = getContentFromFile;
exports.getPackageJsonUpdateTime = getPackageJsonUpdateTime;
const fs_1 = require("fs");
const path_1 = require("path");
const textFilePath = (0, path_1.join)(__dirname, '/../assets/content.txt');
const packageJsonPath = (0, path_1.join)(__dirname, '/../../package.json');
function getContentFromFile(req, res) {
    (0, fs_1.readFile)(textFilePath, 'utf8', (err, data) => {
        if (err) {
            res.statusCode = 500;
            res.end('Error reading the text file');
            return;
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(data.toUpperCase());
    });
}
function getPackageJsonUpdateTime(req, res) {
    new Promise((resolve, reject) => {
        (0, fs_1.stat)(packageJsonPath, (err, stats) => {
            if (err) {
                reject(packageJsonPath);
                return;
            }
            resolve(stats.mtime);
        });
    })
        .then((mtime) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ lastUpdate: mtime.toISOString() }));
    })
        .catch((error) => {
        res.statusCode = 500;
        res.end(error);
    });
}
