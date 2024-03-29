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
    .enum(['company', 'accounts', 'employees'])
    .default('accounts')
    .optional(),
  password: z.string().min(6).max(20),
});

export const loginSchema = z.object({
  phone: z.string().regex(PHONE_REGEX),
  password: z.string().min(6).max(20),
});

export enum AccountStatus {
  ACTIVE = 'active',
  PENDING = 'pending',
  BLOCK = 'block',
  DELETED = 'deleted',
}

export enum VerificationAction {
  REGISTRATION = 'registration',
  RESERT_PASSWORD = 'resert_password',
  LOGIN = 'login',
}

export enum VerificationStatus {
  VERIFIED = 'verified',
  CANCEL = 'cancel',
  PENDING = 'pending',
}
