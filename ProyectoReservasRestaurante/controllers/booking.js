import {validateBooking, validatePartialBooking} from '../schemas/booking.js'

export class BookingController {
  constructor({ bookingModel }) {
    this.bookingModel = bookingModel
  }

  getAll = async (req, res) => {
    const bookings = await this.bookingModel.getAll()
    res.json(bookings)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const booking = await this.bookingModel.getById({ id })

    if (booking) return res.json(booking)
      res.status(404).json({ message: 'Booking not found' })
  }

  create = async (req, res) => {
    const resultado = validateBooking(req.body)

    if (resultado.error) {
      return res.status(400).json({ error: JSON.parse(resultado.error.message) })
    }

    const newBooking = await this.bookingModel.create({input: resultado.data })
    res.status(201).json(newBooking)

  }

  delete = async (req, res) => {
    const { id } = req.params
    const resultado = await this.bookingModel.delete({ id })
    
    if (resultado) return res.json({ message: 'Booking deleted' }) 
      return res.status(404).json({ message: 'Booking not found' })
  }

  update = async (req, res) => {
    const { id } = req.params
    const resultado = validatePartialBooking(req.body)

    if (resultado.error) return res.status(400).json({ error: JSON.parse(resultado.error.message) })
    
    const updatedBooking =  await this.bookingModel.update( { id, input: resultado.data })
  
    if (updatedBooking) return res.json(updatedBooking) 
      return res.status(404).json({ message: 'Booking not found' })
  }
}