import * as http from 'http';
import {contentController, updateTimeController} from "../controller/controller";

export function handleRequest(req: http.IncomingMessage, res: http.ServerResponse) {
    if (req.method === 'GET' && req.url === '/content') {
        contentController(req, res);
    } else if (req.method === 'GET' && req.url === '/updateTime') {
        updateTimeController(req, res);
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
}