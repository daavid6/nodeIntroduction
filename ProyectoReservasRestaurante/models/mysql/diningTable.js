import mysql from 'mysql2/promise'

const config = {
  host: '127.0.0.1',
  user: 'root',
  port: 3306,
  password: 'root',
  database: 'restaurant_booking_db'
}

const connection = await mysql.createConnection(config)

export class DiningTableModel {
  static async getAll () {
    const [diningTables] = await connection.query(
      'SELECT * FROM dining_table;'
    )

    return diningTables
  }

  static async getById({ restaurant_id, number }) {
    const [diningTables] = await connection.query(
      'SELECT * FROM dining_table WHERE restaurant_id = ? and number = ?;', 
      [restaurant_id, number]
    )

    return diningTables
  }
  
  static async create({ input }) {
    const {
      restaurant_id,
      number,
      seats
    } = input

    try {
      await connection.query(
        `insert into dining_table (restaurant_id, number, seats) values (?, ?, ?)`,
        [restaurant_id, number, seats]
      )
    } catch (error) {
      console.error("Error ----- inserting dining table");
    }

    const [diningTable] = await connection.query(
      'SELECT number, restaurant_id, seats FROM dining_table WHERE number = ? and restaurant_id = ?;', 
      [number, restaurant_id]
    )

    return diningTable[0]
  }

  static async delete({ restaurant_id, number }) {
    try {
      await connection.beginTransaction()

      await connection.query('delete from booking where restaurant_id = ? and table_number = ?;', [restaurant_id, number])
      await connection.query('delete from dining_table where restaurant_id = ? and number = ?;', [restaurant_id, number])

      await connection.commit()

      return { success: true, restaurant_id, number }

    } catch (error) {
      await connection.rollback()
      throw error;
    }
  }

  static async update({ restaurant_id, number, input }) {
    const fieldsToUpdate = Object.keys(input).map(key => `${key} = ?`).join(', ')

    await connection.query(
      `UPDATE dining_table SET ${fieldsToUpdate} WHERE restaurant_id = ? and number = ?;`,
      [...Object.values(input), restaurant_id, number]
    )

    return { success: true, updatedFields: input }
  }
}