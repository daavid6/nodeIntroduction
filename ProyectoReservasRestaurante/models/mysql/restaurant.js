import mysql from 'mysql2/promise'

const config = {
  host: '127.0.0.1',
  user: 'root',
  port: 3306,
  password: 'root',
  database: 'restaurant_booking_db'
}

const connection = await mysql.createConnection(config)

export class RestaurantModel {
  static async getAll () {
    const [restaurants] = await connection.query(
      'SELECT * FROM restaurant;'
    )

    return restaurants
  }

  static async getById({ id }) {
    const [restaurants] = await connection.query(
      'SELECT * FROM restaurant WHERE id = ?;', 
      [id]
    )

    return restaurants
  }
  
  static async create({ input }) {
    const {
      name,
      address
    } = input

    try {
      await connection.query(
        `insert into restaurant (name, address) values (?, ?)`,
        [name, address]
      )
    } catch (error) {
      console.error("Error ----- inserting restaurant");
    }

    const [restaurant] = await connection.query(
      'SELECT id, name, address FROM restaurant WHERE name = ? and address = ?;', 
      [name, address]
    )

    return restaurant[0]
  }

  static async delete({ id }) {
    try {
      await connection.beginTransaction()

      await connection.query('delete from booking where restaurant_id = ?;', [id])
      await connection.query('delete from dining_table where restaurant_id = ?;', [id])
      await connection.query('delete from restaurant where id = ?', [id])

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
      `UPDATE restaurant SET ${fieldsToUpdate} WHERE id = ?`,
      values
    );

    return { success: true, id, updatedFields: input };
  }
}