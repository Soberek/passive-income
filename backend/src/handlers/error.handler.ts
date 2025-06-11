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

export const errorHandler = (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
  // Jeśli błąd to nasz AppError, wyślij konkretną odpowiedź
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  // Logowanie nieznanych błędów (np. do Sentry)
  console.error(err);

  // Błąd nieznany - 500
  res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};

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
