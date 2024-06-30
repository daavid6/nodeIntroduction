import {validateRestaurant, validatePartialRestaurant} from '../schemas/restaurant.js'

export class RestaurantController {
  constructor({ restaurantModel }) {
    this.restaurantModel = restaurantModel
  }

  getAll = async (req, res) => {
    const restaurants = await this.restaurantModel.getAll()
    res.json(restaurants)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const restaurant = await this.restaurantModel.getById({ id })

    if (restaurant) return res.json(restaurant)
      res.status(404).json({ message: 'Restaurant not found' })
  }

  create = async (req, res) => {
    const resultado = validateRestaurant(req.body)

    if (resultado.error) {
      return res.status(400).json({ error: JSON.parse(resultado.error.message) })
    }

    const newRestaurant = await this.restaurantModel.create({input: resultado.data })
    res.status(201).json(newRestaurant)

  }

  delete = async (req, res) => {
    const { id } = req.params
    const resultado = await this.restaurantModel.delete({ id })
    
    if (resultado) return res.json({ message: 'Restaurant deleted' }) 
      return res.status(404).json({ message: 'Restaurant not found' })
  }

  update = async (req, res) => {
    const { id } = req.params
    const resultado = validatePartialRestaurant(req.body)

    if (resultado.error) return res.status(400).json({ error: JSON.parse(resultado.error.message) })
    
    const updatedRestaurant =  await this.restaurantModel.update( { id, input: resultado.data })
  
    if (updatedRestaurant) return res.json(updatedRestaurant) 
      return res.status(404).json({ message: 'Restaurant not found' })
  }
}