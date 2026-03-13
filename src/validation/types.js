import { z } from "zod";

// User Signup Schema
const signupSchema = z.object({
  // Mandatory fields
  fullName: z
    .string({ required_error: "fullName is required" })
    .min(2, "Full name must be at least 2 characters"),

  panNumber: z
    .string({ required_error: "panNumber is required" })
    .regex(
      /^[A-Z]{5}[0-9]{4}[A-Z]$/,
      "Invalid PAN format. Expected: AAAAA9999A (5 letters, 4 digits, 1 letter)",
    ),

  dateOfBirth: z
    .string({ required_error: "dateOfBirth is required" })
    .refine(
      (d) => !isNaN(Date.parse(d)),
      "Invalid date format for dateOfBirth",
    ),

  email: z
    .string({ required_error: "email is required" })
    .email("Invalid email address"),

  mobile: z
    .string({ required_error: "mobile is required" })
    .regex(
      /^[6-9]\d{9}$/,
      "Invalid Indian mobile number. Must be 10 digits starting with 6–9",
    ),

  // Optional fields
  gender: z.enum(["M", "F", "T"]).optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  pincode: z
    .string()
    .regex(/^\d{6}$/, "Pincode must be exactly 6 digits")
    .optional(),
  country: z.string().optional(),
  occupation: z.string().optional(),

  // Internal test flag — triggers mock error response when true
  testError: z.boolean().optional(),
});

// Order Entry Schema
const orderEntrySchema = z.object({
  fundIsin: z
    .string({ required_error: "fundIsin is required" })
    .min(1, "fundIsin is required"),
  investmentAmount: z.coerce
    .number({ required_error: "investmentAmount is required" })
    .positive("investmentAmount must be greater than 0"),
  folioNumber: z.string().optional(),
});

// Mutual Fund Schemas

// Input validation schemas
const searchQuerySchema = z.object({
  q: z.string().min(1, "Query parameter is required"),
});

// Serializer for search results
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

export {
  signupSchema,
  orderEntrySchema,
  searchQuerySchema,
  schemeCodeSchema,
  dateRangeSchema,
};
