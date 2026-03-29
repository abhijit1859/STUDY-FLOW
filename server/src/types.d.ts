declare global {
  namespace Express {
    interface Request {
      auth?: { userId?: string } | any;
      rawBody?: Buffer;
    }
  }
}
export {};
