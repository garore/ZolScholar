import { RequestHandler } from "express";
import { VisitorCountResponse } from "@shared/api";

// Simple in-memory storage for visitor count
// In production, you might want to use a database
let totalVisitors = 0;
let todayVisitors = 0;
let lastResetDate = new Date().toDateString();

// Store unique visitor IPs for today to avoid duplicate counts
const todayUniqueIPs = new Set<string>();

export const handleVisitorCount: RequestHandler = (req, res) => {
  // Reset today's count if it's a new day
  const currentDate = new Date().toDateString();
  if (currentDate !== lastResetDate) {
    todayVisitors = 0;
    todayUniqueIPs.clear();
    lastResetDate = currentDate;
  }

  // Get visitor IP address
  const visitorIP = req.ip || req.connection.remoteAddress || "unknown";

  // If this is a new unique visitor today, increment counters
  if (!todayUniqueIPs.has(visitorIP)) {
    todayUniqueIPs.add(visitorIP);
    totalVisitors++;
    todayVisitors++;
  }

  const response: VisitorCountResponse = {
    totalVisitors,
    todayVisitors,
  };

  res.json(response);
};

export const handleGetVisitorCount: RequestHandler = (req, res) => {
  // Reset today's count if it's a new day
  const currentDate = new Date().toDateString();
  if (currentDate !== lastResetDate) {
    todayVisitors = 0;
    todayUniqueIPs.clear();
    lastResetDate = currentDate;
  }

  const response: VisitorCountResponse = {
    totalVisitors,
    todayVisitors,
  };

  res.json(response);
};
