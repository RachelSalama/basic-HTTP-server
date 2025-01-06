import {getContent, getUpdateTime} from "../utils/file-utils";
import * as http from 'http';


export function contentController(req: http.IncomingMessage, res: http.ServerResponse): void {
    getContent(req, res);
}

export function updateTimeController(req: http.IncomingMessage, res: http.ServerResponse): void {
    getUpdateTime(req, res);
}
