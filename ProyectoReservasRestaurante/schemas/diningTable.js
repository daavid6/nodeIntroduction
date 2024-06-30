import z from 'zod';

const diningTableSchema = z.object({
  number: z.number(),
  restaurant_id: z.number(),
  seats: z.number()
})

export function validateDiningTable(input) {
  return diningTableSchema.safeParse(input);
}

export function validatePartialDiningTable(input) {
  return diningTableSchema.partial().safeParse(input);
}