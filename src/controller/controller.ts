import {getContent, getUpdateTime} from "../utils/file-utils";
import * as http from 'http';


export function contentController(req: http.IncomingMessage, res: http.ServerResponse) {
    getContent(req, res);
}

export function updateTimeController(req: http.IncomingMessage, res: http.ServerResponse) {
    getUpdateTime(req, res);
}
