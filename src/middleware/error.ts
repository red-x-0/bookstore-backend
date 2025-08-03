import { Request, Response, NextFunction } from "express";

const notFound = (req: Request, res: Response, next: NextFunction): void => {
  const error = new Error(`not found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode).json({ message: err.message, Error: err  })
  console.log(err);
  next()
}

export { notFound, errorHandler } 