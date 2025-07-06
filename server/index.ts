import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleVisitorCount, handleGetVisitorCount } from "./routes/visitors";
import scholarshipsRouter from "./routes/scholarships";

export function createServer() {
  const app = express();

  // Trust proxy for accurate IP detection
  app.set("trust proxy", true);

  // Middleware
  app.use(
    cors({
      origin: true,
      credentials: true,
    }),
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Request logging middleware
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Express server v2!" });
  });

  app.get("/api/demo", handleDemo);

  // Visitor tracking routes
  app.post("/api/visitor", handleVisitorCount);
  app.get("/api/visitors", handleGetVisitorCount);

  // Error handling middleware
  app.use(
    (
      err: any,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction,
    ) => {
      console.error("Server error:", err);
      res.status(500).json({ error: "Internal server error" });
    },
  );

  return app;
}
