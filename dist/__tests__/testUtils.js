"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockResponse = exports.mockRequest = void 0;
const mockRequest = (data) => {
    return Object.assign({ params: {}, body: {}, query: {} }, data);
};
exports.mockRequest = mockRequest;
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};
exports.mockResponse = mockResponse;
