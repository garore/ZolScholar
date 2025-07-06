/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Response type for visitor count endpoint
 */
export interface VisitorCountResponse {
  totalVisitors: number;
  todayVisitors: number;
}

/**
 * Scholarship interface for scholarship management
 */
export interface Scholarship {
  id: string;
  title: string;
  country: string;
  flag: string;
  university: string;
  description: string;
  funding: string;
  level: string;
  deadline: string;
  requirements: string[];
  applicationSteps: string[];
  documents: string[];
  benefits: string[];
  applicationLink: string;
  additionalLinks?: { name: string; url: string }[];
  isActive: boolean;
  createdAt: string;
}

/**
 * Response type for scholarships endpoint
 */
export interface ScholarshipsResponse {
  success: boolean;
  count: number;
  scholarships: Scholarship[];
  motivationalMessage: string;
}
