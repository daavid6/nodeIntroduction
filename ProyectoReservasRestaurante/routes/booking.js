import { Router } from 'express'
import { BookingController } from '../controllers/booking.js';

export const createBookingRouter = ({ bookingModel }) => {
  const bookingRouter = Router()
  const bookingController = new BookingController({ bookingModel })

  bookingRouter.get('/', bookingController.getAll)
  bookingRouter.get('/:id', bookingController.getById)
  bookingRouter.post('/', bookingController.create)
  bookingRouter.delete('/:id', bookingController.delete)
  bookingRouter.patch('/:id', bookingController.update)

  return bookingRouter
}