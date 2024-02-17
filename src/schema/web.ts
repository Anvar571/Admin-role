import { z } from 'zod';
const PHONE_REGEX = /^998\d{2}\d{3}\d{2}\d{2}$/;

export const registerSchema = z.object({
  first_name: z.string({ required_error: 'first_name required' }),
  last_name: z.string(),
  phone: z.string().regex(PHONE_REGEX),
  role_id: z.number(),
  email: z.string().email().optional(),
  photo: z.string().url(),
  type: z
    .enum(['customer', 'admin', 'moderator'])
    .default('customer')
    .optional(),
  password: z.string().min(6).max(20),
});

export const loginSchema = z.object({
  phone: z.string().regex(PHONE_REGEX),
  password: z.string().min(6).max(20),
});
