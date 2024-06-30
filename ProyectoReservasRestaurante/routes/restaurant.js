import { Router } from 'express'
import { RestaurantController } from '../controllers/restaurant.js';

export const createRestaurantRouter = ({ restaurantModel }) => {
  const restaurantRouter = Router()
  const restaurantController = new RestaurantController({ restaurantModel })

  restaurantRouter.get('/', restaurantController.getAll)
  restaurantRouter.get('/:id', restaurantController.getById)
  restaurantRouter.post('/', restaurantController.create)
  restaurantRouter.delete('/:id', restaurantController.delete)
  restaurantRouter.patch('/:id', restaurantController.update)

  return restaurantRouter
}