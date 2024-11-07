"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const handleError = (error, res) => {
    console.error(error);
    res.status(500).json({ error: 'An error occurred during image processing' });
};
exports.handleError = handleError;
