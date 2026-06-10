"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendServerError = exports.sendNotFound = exports.sendBadRequest = exports.sendCreated = exports.sendSuccess = void 0;
const sendSuccess = (res, message, data) => {
    const payload = { message };
    if (data !== undefined) {
        payload.data = data;
    }
    return res.status(200).json(payload);
};
exports.sendSuccess = sendSuccess;
const sendCreated = (res, message, data) => res.status(201).json({ message, data });
exports.sendCreated = sendCreated;
const sendBadRequest = (res, message) => res.status(400).json({ message });
exports.sendBadRequest = sendBadRequest;
const sendNotFound = (res, message) => res.status(404).json({ message });
exports.sendNotFound = sendNotFound;
const sendServerError = (res, error) => res.status(500).json({ message: error?.message || "Internal Server Error" });
exports.sendServerError = sendServerError;
exports.default = {
    sendSuccess: exports.sendSuccess,
    sendCreated: exports.sendCreated,
    sendBadRequest: exports.sendBadRequest,
    sendNotFound: exports.sendNotFound,
    sendServerError: exports.sendServerError,
};
