import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleVisitorCount, handleGetVisitorCount } from "./routes/visitors";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Express server v2!" });
  });

  app.get("/api/demo", handleDemo);

  // Visitor tracking routes
  app.post("/api/visitor", handleVisitorCount);
  app.get("/api/visitors", handleGetVisitorCount);

  return app;
}
