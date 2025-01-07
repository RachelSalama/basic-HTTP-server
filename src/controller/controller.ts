import {getContentFromFile, getPackageJsonUpdateTime} from "../utils/file-utils";
import { ServerResponse, IncomingMessage } from 'http'

export function contentController(req: IncomingMessage, res: ServerResponse) {
    getContentFromFile(req, res);
}

export function updateTimeController(req: IncomingMessage, res: ServerResponse) {
    getPackageJsonUpdateTime(req, res);
}
