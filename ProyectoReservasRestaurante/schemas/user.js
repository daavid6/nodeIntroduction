import z from 'zod';

const userSchema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string()
})

export function validateUser(input) {
  return userSchema.safeParse(input);
}

export function validatePartialUser(input) {
  return userSchema.partial().safeParse(input);
}