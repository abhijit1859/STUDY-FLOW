import { requireAuth } from "@clerk/express";
import type { Request, Response, NextFunction } from "express";

export const requireAuthMiddleware = [
  requireAuth(),
  (req: Request, _res: Response, next: NextFunction) => {
    
    next();
  },
];
