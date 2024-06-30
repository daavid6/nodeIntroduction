import { Router } from 'express'
import { DiningTableController } from '../controllers/diningTable.js';

export const createDiningTableRouter = ({ diningTableModel }) => {
  const diningTableRouter = Router()
  const diningTableController = new DiningTableController({ diningTableModel })

  diningTableRouter.get('/', diningTableController.getAll)
  diningTableRouter.get('/:restaurant_id/:number', diningTableController.getById)
  diningTableRouter.post('/', diningTableController.create)
  diningTableRouter.delete('/:restaurant_id/:number', diningTableController.delete)
  diningTableRouter.patch('/:restaurant_id/:number', diningTableController.update)

  return diningTableRouter
}