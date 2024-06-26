export class MovieController {
  constructor({ movieModel }) {
    this.movieModel = movieModel
  }

  getAll = async (req, res) => {
  const { genre } = req.query;
    const movies = await this.movieModel.getAll({ genre })
    res.json(movies)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const movie = await this.movieModel.getById({ id })
    if (movie) return res.json(movie)
    res.status(404).json({ message: 'Movie not found' })
  }

  create = async (req, res) => {
    const resultado = validateMovie(req.body)
  
    if (resultado.error) {
      return res.status(400).json({ error: JSON.parse(resultado.error.message) })
    }
  
    const newMovie = await this.movieModel.create({input: resultado.data })
    res.status(201).json(newMovie)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const resultado = await this.movieModel.delete({id})
  
    if (resultado) return res.json({ message: 'Movie deleted' }) 
    return res.status(404).json({ message: 'Movie not found' })
  }

  update = async (req, res) => {
    const { id } = req.params;
    const resultado = validatePartialMovie(req.body);
  
    if (!resultado.success) {
      return res.status(400).json({ error: JSON.parse(resultado.error.message) })
    }
  
    const updateMovie = await this.movieModel.update( { id, input: resultado.data })
  
    if (updateMovie === false) return res.status(404).json({ message: 'Movie not found' })
    res.json(updateMovie)
  }
}