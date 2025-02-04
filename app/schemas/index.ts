import { z } from 'zod'

export const User = z.object({
  kindeId: z.string(),
  id: z.union([z.string(), z.number()]),
  username: z.string(),
  email: z.string().optional(),
  preferred_email: z.string().optional(),
  first_name: z.string(),
  last_name: z.string(),
  full_name: z.string().nullable().optional(),
  status: z.string().nullable(),
  governmentId: z.string().nullable(),
  phoneNumber: z.number().nullable(),
  jobTitle: z.string().nullable(),
  notes: z.string().nullable(),
  organizations: z.array(z.string()).optional(),
  identities: z.array(z.object({
    type: z.string(),
    identity: z.string(),
  })).optional(),
})
export type User = z.infer<typeof User>

export const Users = z.array(User)
export type Users = User[]

export const UserForm = z.object({
  username: z.string().min(3, {
    message: 'Username must be at least 3 characters.',
  }),
  first_name: z.nullable(z.string().min(2, {
    message: 'First name must be at least 2 characters.',
  })),
  last_name: z.string().min(2, {
    message: 'Last name must be at least 2 characters.',
  }),
})
export type UserForm = z.infer<typeof UserForm>
