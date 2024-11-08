// src/__tests__/testUtils.ts
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

export const mockRequest = (data?: Partial<Request>): Request => {
  return {
    params: {},
    body: {},
    query: {},
    ...data,
  } as Request;
};

export const mockResponse = (): Response => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};
