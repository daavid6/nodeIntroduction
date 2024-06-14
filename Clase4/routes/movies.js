import { Router } from 'express'
import { randomUUID } from 'node:crypto';
import { validateMovie, validatePartialMovie } from './schemas/movies.js';

//  Aún experimental pero ya funciona, para importar json:
import movies from './movies.json' with { type: 'json'};
/* 
  --- Alternativa 1 ---
  import fs from 'node:fs'
  const movies = JSON.parse(fs.readFileSync('./movies.json'))


  --- Alternativa 2 ---
  import { createRequire } from 'node:module'
  const require = createRequire(import.meta.url)
  const movies = require('./movies.json'
*/


export const moviesRouter = Router()

moviesRouter.get('/', (req, res) => {
  const { genre } = req.query;
  if (genre) {
    const filteredMovies = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    );
    return res.json(filteredMovies);
  }

  res.json(movies);
})

moviesRouter.get('/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find((movie) => movie.id === id);
  if (movie) return res.json(movie)

  res.status(404).json({ message: 'Movie not found' })
})

// Añadir película
moviesRouter.post('/', (req, res) => {
  const resultado = validateMovie(req.body)

  if (resultado.error) {
    return res.status(400).json({ error: JSON.parse(resultado.error.message) })
  }

  const newMovie = {
    id: randomUUID(),
    ...resultado.data,
  }; 

  movies.push(newMovie);
  res.status(201).json(newMovie)
})


// Editar película
moviesRouter.patch('/:id', (req, res) => {
  const { id } = req.params;
  const resultado = validatePartialMovie(req.body);

  if (!resultado.success) {
    return res.status(400).json({ error: JSON.parse(resultado.error.message) })
  }


  const movieIndex = movies.findIndex((movie) => movie.id === id);

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  const updateMovie = {
    ...movies[movieIndex],
    ...resultado.data
  }

  movies[movieIndex] = updateMovie

  res.json(movies[movieIndex])
})

moviesRouter.delete('/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex((movie) => movie.id === id);

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  movies.splice(movieIndex, 1);

  return res.json({ message: 'Movie deleted' })
})