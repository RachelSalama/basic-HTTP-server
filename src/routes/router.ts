import { IncomingMessage, ServerResponse } from 'http';
import {contentController, updateTimeController} from "../controller/controller";

export const handleRequest = (req: IncomingMessage, res: ServerResponse) => {
    if (req.method === 'GET') {
        switch (req.url) {
            case '/content':
                contentController(req, res);
                break;
            case '/updateTime':
                updateTimeController(req, res);
                break;
        }
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
}