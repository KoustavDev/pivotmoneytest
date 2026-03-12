import { z } from "zod";

// Input validation schemas
const searchQuerySchema = z.object({
  q: z.string().min(1, "Query parameter is required"),
});

const schemeCodeSchema = z.object({
  schemeCode: z.string().min(1, "Scheme code is required"),
});

const dateRangeSchema = z.object({
  startDate: z
    .string()
    .optional()
    .refine(
      (date) => !date || !isNaN(Date.parse(date)),
      "Invalid start date format",
    ),
  endDate: z
    .string()
    .optional()
    .refine(
      (date) => !date || !isNaN(Date.parse(date)),
      "Invalid end date format",
    ),
});

export { searchQuerySchema, schemeCodeSchema, dateRangeSchema };
