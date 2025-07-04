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
  try {
    // Reset today's count if it's a new day
    const currentDate = new Date().toDateString();
    if (currentDate !== lastResetDate) {
      todayVisitors = 0;
      todayUniqueIPs.clear();
      lastResetDate = currentDate;
    }

    // Get visitor IP address with better detection
    const visitorIP =
      req.headers["x-forwarded-for"]?.toString().split(",")[0] ||
      req.headers["x-real-ip"]?.toString() ||
      req.socket.remoteAddress ||
      req.ip ||
      "unknown";

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

    res.status(200).json(response);
  } catch (error) {
    console.error("Error tracking visitor:", error);
    res.status(500).json({ error: "Failed to track visitor" });
  }
};

export const handleGetVisitorCount: RequestHandler = (req, res) => {
  try {
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

    res.status(200).json(response);
  } catch (error) {
    console.error("Error getting visitor count:", error);
    res.status(500).json({ error: "Failed to get visitor count" });
  }
};
