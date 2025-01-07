import { readFile, stat } from 'fs';
import { join } from 'path';
import {IncomingMessage, ServerResponse} from 'http';

const textFilePath: string = join(__dirname, '/../assets/content.txt');
const packageJsonPath: string = join(__dirname, '/../../package.json');

export function getContentFromFile(req: IncomingMessage, res: ServerResponse) {
    readFile(textFilePath, 'utf8', (err, data) => {
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

export function getPackageJsonUpdateTime(req: IncomingMessage, res: ServerResponse) {
    new Promise<Date>((resolve, reject) => {
        stat(packageJsonPath, (err, stats) => {
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
