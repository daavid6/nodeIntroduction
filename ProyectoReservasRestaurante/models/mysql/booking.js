import mysql from 'mysql2/promise'

const config = {
  host: '127.0.0.1',
  user: 'root',
  port: 3306,
  password: 'root',
  database: 'restaurant_booking_db'
}

const connection = await mysql.createConnection(config)

export class BookingModel {
  static async getAll () {
    const [bookings] = await connection.query(
      'SELECT * FROM booking;'
    )

    return bookings
  }

  static async getById({ id }) {
    const [bookings] = await connection.query(
      'SELECT * FROM booking WHERE id = ?;', 
      [id]
    )

    return bookings
  }
  
  static async create({ input }) {
    const {
      user_id,
      restaurant_id,
      table_number,
      booking_date
    } = input

    try {
      await connection.query(
        `insert into booking (user_id, restaurant_id, table_number, booking_date) values (?, ?, ?, ?)`,
        [user_id, restaurant_id, table_number, booking_date]
      )
    } catch (error) {
      console.error("Error ----- inserting booking");
    }

    const [booking] = await connection.query(
      `SELECT id, user_id, restaurant_id, table_number, booking_date 
       FROM booking WHERE user_id = ? and restaurant_id = ? and table_number = ? and booking_date = ?;`, 
      [user_id, restaurant_id, table_number, booking_date]
    )

    return booking[0]
  }

  static async delete({ id }) {
    try {
      await connection.beginTransaction()


      await connection.query('delete from booking where id = ?', [id])

      await connection.commit()

      return { success: true, id }

    } catch (error) {
      await connection.rollback()
      throw error;
    }
  }

  static async update({ id, input }) {
    const fieldsToUpdate = Object.keys(input).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(input), id];

    await connection.query(
      `UPDATE booking SET ${fieldsToUpdate} WHERE id = ?`,
      values
    );

    return { success: true, id, updatedFields: input };
  }
}