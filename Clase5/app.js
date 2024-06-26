import express, { json } from 'express';
import { corsMiddleware } from './middlewares/cors.js';
import { createMovieRouter } from './routes/movies.js'
import { MovieModel } from './models/mysql/movie.js'

const app = express()
app.use(json())
app.use(corsMiddleware())
app.disable('x-powered-by')

// Recuperar todas las peliculas
app.use('/movies', createMovieRouter({ movieModel: MovieModel }))

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`Server listening on port: http://localhost:${PORT}`)
})