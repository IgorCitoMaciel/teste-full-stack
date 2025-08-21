import { CorsOptions } from "cors";
import { json, urlencoded } from "express";

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = (
      process.env.CORS_ORIGIN || "http://localhost:3000,http://localhost:8081"
    ).split(",");

    if (!origin && process.env.NODE_ENV === "production") {
      callback(new Error("Not allowed by CORS"));
      return;
    }

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
  ],
  exposedHeaders: ["Content-Range", "X-Content-Range"],
  credentials: true,
  maxAge: 86400,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

export const jsonOptions = {
  limit: "10kb",
};

export const urlencodedOptions = {
  extended: false,
  limit: "10kb",
};

export const securityHeaders = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "Content-Security-Policy": "default-src 'self'",
  "Referrer-Policy": "strict-origin-when-cross-origin",
};
