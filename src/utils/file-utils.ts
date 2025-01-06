import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';

const textFilePath: string = path.join(__dirname, '/../assets/content.txt');
const packageJsonPath: string = path.join(__dirname, '/../../package.json');

export function getContentFromFile(req: http.IncomingMessage, res: http.ServerResponse) {
    fs.readFile(textFilePath, 'utf8', (err, data) => {
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

export function getPackageJsonUpdateTime(req: http.IncomingMessage, res: http.ServerResponse) {
    new Promise<Date>((resolve, reject) => {
        fs.stat(packageJsonPath, (err, stats) => {
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
