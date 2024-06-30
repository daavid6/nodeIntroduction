import z from 'zod';

const bookingSchema = z.object({
  user_id: z.number(),
  restaurant_id: z.number(),
  table_number: z.number(),
  booking_date: z.string()
})

export function validateBooking(input) {
  return bookingSchema.safeParse(input);
}

export function validatePartialBooking(input) {
  return bookingSchema.partial().safeParse(input);
}