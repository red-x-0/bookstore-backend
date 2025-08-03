import { NextFunction, Request, Response } from "express";


export const checkApiKey = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const key = req.headers['x-api-key'];
  if (!key || key !== process.env.API_KEY) {
    res.status(403).json({ message: 'Forbidden - Invalid API Key' });
    return;
  }
  next();
  return Promise.resolve();
};
