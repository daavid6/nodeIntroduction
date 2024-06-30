import z from 'zod';

const restaurantSchema = z.object({
  name: z.string(),
  address: z.string(),
})

export function validateRestaurant(input) {
  return restaurantSchema.safeParse(input);
}

export function validatePartialRestaurant(input) {
  return restaurantSchema.partial().safeParse(input);
}
