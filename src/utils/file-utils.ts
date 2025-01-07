import { readFile, stat } from 'fs';
import {IncomingMessage, ServerResponse} from 'http';
import {packageJsonPath, textFilePath} from "../main";

export const getContentFromFile = (req: IncomingMessage, res: ServerResponse) => {
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

export const getPackageJsonUpdateTime = (req: IncomingMessage, res: ServerResponse) => {
    new Promise<string>((resolve, reject) => {
        stat(packageJsonPath, (err, stats) => {
            if (err) {
                reject(packageJsonPath);
                return;
            }
            resolve(stats.mtime.toISOString());
        });
    })
        .then((mtime) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ lastUpdate: mtime }));
        })
        .catch((error) => {
            res.statusCode = 500;
            res.end(error);
        });
}
