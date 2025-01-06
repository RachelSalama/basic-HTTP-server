import {getContentFromFile, getPackageJsonUpdateTime} from "../utils/file-utils";
import * as http from 'http';


export function contentController(req: http.IncomingMessage, res: http.ServerResponse) {
    getContentFromFile(req, res);
}

export function updateTimeController(req: http.IncomingMessage, res: http.ServerResponse) {
    getPackageJsonUpdateTime(req, res);
}
