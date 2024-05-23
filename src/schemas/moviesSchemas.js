import zd from 'zod'

const movieSchema = zd.object({
  title: zd.string({
    invalid_type_error: 'Movie tittle must be a string',
    required_error: 'Movie tittle is required'
  }),
  year: zd.number().int().min(1900).max(2024),
  director: zd.string(),
  duration: zd.number().int().positive(),
  poster: zd.string().url(),
  genre: zd.array(
    zd.enum(['Action', 'Drama', 'Adventure', 'Comedy', 'Classic', 'Terror', 'Horror', 'Fantasy', 'Thriller', 'Sci-Fi', 'Crime'],
      {
        required_error: 'Movie genre is required',
        invalid_type_error: 'Movie genre must be a array of enum Genres'
      }
    )
  ),
  rate: zd.number().min(0).max(10).default(0),
  synopsis: zd.string({
    invalid_type_error: 'Movie tittle must be a string',
    required_error: 'Movie tittle is required'
  })
})

export function validatedMovie (object) {
  return movieSchema.safeParse(object)
}

export function validatedPartialMovie (object) {
  return movieSchema.partial().safeParse(object)
}
