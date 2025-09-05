// Generated Zod schema for analytics
import { z } from 'zod';

export const BusinessSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  subcategory: z.string().optional(),
  logo: z.string().optional(),
});

export type Business = z.infer<typeof BusinessSchema>;

export const KeyMetricSchema = z.object({
  label: z.string(),
  value: z.union([z.number(), z.string()]),
  change: z.number(),
  trend: z.union([z.string(), z.string(), z.string()]),
  icon: z.string(),
});

export type KeyMetric = z.infer<typeof KeyMetricSchema>;

export const TrafficDataSchema = z.object({
  date: z.string(),
  views: z.number(),
  calls: z.number(),
  directions: z.number(),
});

export type TrafficData = z.infer<typeof TrafficDataSchema>;

export const DemographicDataSchema = z.object({
  label: z.string(),
  value: z.number(),
  color: z.string(),
});

export type DemographicData = z.infer<typeof DemographicDataSchema>;

export const HourlyTrafficSchema = z.object({
  hour: z.string(),
  traffic: z.number(),
});

export type HourlyTraffic = z.infer<typeof HourlyTrafficSchema>;

export const WeekdayTrafficSchema = z.object({
  day: z.string(),
  traffic: z.number(),
});

export type WeekdayTraffic = z.infer<typeof WeekdayTrafficSchema>;

export const ReviewTrendSchema = z.object({
  month: z.string(),
  avgRating: z.number(),
  reviewCount: z.number(),
});

export type ReviewTrend = z.infer<typeof ReviewTrendSchema>;

export const ReviewSentimentSchema = z.object({
  label: z.string(),
  value: z.number(),
  color: z.string(),
});

export type ReviewSentiment = z.infer<typeof ReviewSentimentSchema>;

export const PhotoPerformanceSchema = z.object({
  id: z.string(),
  url: z.string(),
  views: z.number(),
  engagement: z.number(),
  position: z.number(),
});

export type PhotoPerformance = z.infer<typeof PhotoPerformanceSchema>;

export const CompetitorDataSchema = z.object({
  id: z.string(),
  name: z.string(),
  views: z.number(),
  rating: z.number(),
  reviewCount: z.number(),
  responseRate: z.number(),
  position: z.number(),
});

export type CompetitorData = z.infer<typeof CompetitorDataSchema>;

