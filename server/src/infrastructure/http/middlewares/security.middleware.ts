import { Request, Response, NextFunction } from "express";
import { securityHeaders } from "../config/security";

export function securityMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  Object.entries(securityHeaders).forEach(([header, value]) => {
    res.setHeader(header, value);
  });

  res.removeHeader("X-Powered-By");
  res.removeHeader("Server");

  if (!res.getHeader("X-Frame-Options")) {
    res.setHeader("X-Frame-Options", "DENY");
  }

  if (process.env.NODE_ENV === "production" && !req.secure) {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }

  next();
}
