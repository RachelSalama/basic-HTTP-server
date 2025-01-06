import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';

// Define file paths
const textFilePath: string = path.join(__dirname, 'sample.txt'); // Adjust this if your file has a different name or location
const packageJsonPath: string = path.join(__dirname, 'package.json');

// Function to handle '/content' route
function getContent(req: http.IncomingMessage, res: http.ServerResponse): void {
    fs.readFile(textFilePath, 'utf8', (err, data) => {
        if (err) {
            res.statusCode = 500;
            res.end('Error reading the text file');
            return;
        }

        // Convert content to uppercase and send back
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(data.toUpperCase());
    });
}

// Function to handle '/updatetime' route
function getUpdateTime(req: http.IncomingMessage, res: http.ServerResponse): void {
    new Promise<Date>((resolve, reject) => {
        fs.stat(packageJsonPath, (err, stats) => {
            if (err) {
                reject('Error reading package.json');
                return;
            }
            resolve(stats.mtime); // Modified time of package.json
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

// Create HTTP server
const server: http.Server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
    if (req.method === 'GET' && req.url === '/content') {
        getContent(req, res);
    } else if (req.method === 'GET' && req.url === '/updatetime') {
        getUpdateTime(req, res);
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
});

// Server listens on port 3000
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

