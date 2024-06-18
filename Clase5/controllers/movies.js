// import { MovieModel } from "../models/locale-file-system/movie.js";
import { MovieModel } from "../models/mysql/movie.js";
import { validateMovie, validatePartialMovie } from '../schemas/movies.js';

export class MovieController {
  static async getAll (req, res) {
    const { genre } = req.query;
    const movies = await MovieModel.getAll({ genre })
    res.json(movies)
  }

  static async getById (req, res) {
    const { id } = req.params
    const movie = await MovieModel.getById({ id })
    if (movie) return res.json(movie)
    res.status(404).json({ message: 'Movie not found' })
  }

  static async create (req, res) {
    const resultado = validateMovie(req.body)
  
    if (resultado.error) {
      return res.status(400).json({ error: JSON.parse(resultado.error.message) })
    }
  
    const newMovie = await MovieModel.create({input: resultado.data })
    res.status(201).json(newMovie)
  }

  static async delete (req, res) {
    const { id } = req.params
    const resultado = await MovieModel.delete({id})
  
    if (resultado) return res.json({ message: 'Movie deleted' }) 
    return res.status(404).json({ message: 'Movie not found' })
  }

  static async update (req, res) {
    const { id } = req.params;
    const resultado = validatePartialMovie(req.body);
  
    if (!resultado.success) {
      return res.status(400).json({ error: JSON.parse(resultado.error.message) })
    }
  
    const updateMovie = await MovieModel.update( { id, input: resultado.data })
  
    if (updateMovie === false) return res.status(404).json({ message: 'Movie not found' })
    res.json(updateMovie)
  }
}