"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentController = contentController;
exports.updateTimeController = updateTimeController;
const file_utils_1 = require("../utils/file-utils");
function contentController(req, res) {
    (0, file_utils_1.getContentFromFile)(req, res);
}
function updateTimeController(req, res) {
    (0, file_utils_1.getPackageJsonUpdateTime)(req, res);
}
