import express, {json} from 'express'
import cors from 'cors'
import logger from 'morgan'

import { createRestaurantRouter } from './routes/restaurant.js';
import { createUserRouter } from './routes/user.js';
import { createBookingRouter } from './routes/booking.js';
import { createDiningTableRouter } from './routes/diningTable.js';

import { RestaurantModel } from './models/mysql/restaurant.js';
import { UserModel } from './models/mysql/user.js';
import { BookingModel } from './models/mysql/booking.js';
import { DiningTableModel } from './models/mysql/diningTable.js';

const app = express()
app.use(cors())
app.use(logger('dev'))
app.disable('x-powered-by')

const PORT = process.env.PORT ?? 3000


app.use(json())

app.use('/restaurant', createRestaurantRouter({ restaurantModel: RestaurantModel }))
app.use('/user', createUserRouter({ userModel: UserModel }))
app.use('/booking', createBookingRouter({ bookingModel: BookingModel }))
app.use('/diningTable', createDiningTableRouter({ diningTableModel: DiningTableModel }))



app.listen(PORT, () => {
  console.log(`Server listening on port: http://localhost:${PORT}`)
})