import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

class ErrorHandler {
  static handleError = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      res.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
      return;
    }

    // Log unknown errors
    console.error(err);

    // Respond with a generic error message
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  };
}
export default ErrorHandler;
