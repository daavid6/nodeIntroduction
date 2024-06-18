import zod from 'zod';

const movieSchema = zod.object({
  title: zod.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is required',
  }),
  genre: zod.array(
    zod.enum([
      'Crime',
      'Drama',
      'Action',
      'Adventure',
      'Sci-Fi',
      'Romance',
      'Animation',
      'Biography',
      'Fantasy',
    ])
  ),
  year: zod.number().int().min(1900).max(new Date().getFullYear()),
  director: zod.string(),
  duration: zod.number().int().positive(),
  rate: zod.number().min(0).max(10).default(0),
  poster: zod.string().url({
    message: 'Poster must be a valid URL',
  }),
});

export function validateMovie(input) {
  return movieSchema.safeParse(input);
}

export function validatePartialMovie(input) {
  return movieSchema.partial().safeParse(input);
}
