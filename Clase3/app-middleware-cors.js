const express = require('express')
const cors = require('cors')
const crypto = require('node:crypto')
const movies = require('./movies.json')
const { validateMovie, validatePartialMovie } = require('./schemas/movies.js');

const app = express()
app.use(express.json())
app.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = [
      'http://localhost:3000',
      'http://localhost:8080',
      'http://localhost:8081',
      'http://movies.com'
    ]

    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS')) 
  }
}))
app.disable('x-powered-by')


// Recuperar todas las películas, también con filtros
app.get('/movies', (req, res) => {
  const { genre } = req.query;
  if (genre) {
    const filteredMovies = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    );
    return res.json(filteredMovies);
  }

  res.json(movies);
});

// Recuperar película por ID
app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) return res.json(movie)

  res.status(404).json({ message: 'Movie not found' })
})

// Añadir película
app.post('/movies', (req, res) => {
  
  const resultado = validateMovie(req.body)

  if (resultado.error) {
    return res.status(400).json({ error: JSON.parse(resultado.error.message) })
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...resultado.data,
  }; 



  movies.push(newMovie)
  res.status(201).json(newMovie)
})

// Editar película
app.patch('/movies/:id', (req, res) => {
  const { id } = req.params;
  const resultado = validatePartialMovie(req.body);

  if (!resultado.success) {
    return res.status(400).json({ error: JSON.parse(resultado.error.message) })
  }


  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1 ) {
    return res.status(404).json({message: 'Movie not found'})
  }

  const updateMovie = {
    ...movies[movieIndex],
    ...resultado.data
  }

  movies[movieIndex] = updateMovie

  res.json(movies[movieIndex])
})

app.delete('/movies/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  movies.splice(movieIndex, 1)

  return res.json({ message: 'Movie deleted' })
})

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`Server listening on port: http://localhost:${PORT}`)
})