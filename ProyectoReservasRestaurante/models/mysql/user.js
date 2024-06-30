import mysql from 'mysql2/promise'

const config = {
  host: '127.0.0.1',
  user: 'root',
  port: 3306,
  password: 'root',
  database: 'restaurant_booking_db'
}

const connection = await mysql.createConnection(config)

export class UserModel {
  static async getAll () {
    const [users] = await connection.query(
      'SELECT * FROM user;'
    )

    return users
  }

  static async getById({ id }) {
    const [users] = await connection.query(
      'SELECT * FROM user WHERE id = ?;', 
      [id]
    )

    return users
  }
  
  static async create({ input }) {
    const {
      username,
      password,
      email
    } = input

    try {
      await connection.query(
        `insert into user (username, password, email) values (?, ?, ?)`,
        [username, password, email]
      )
    } catch (error) {
      console.error("Error ----- inserting user");
    }

    const [user] = await connection.query(
      'SELECT id, username, password, email FROM user WHERE username = ? and password = ?  and email = ?;', 
      [username, password, email]
    )

    return user[0]
  }

  static async delete({ id }) {
    try {
      await connection.beginTransaction()

      await connection.query('delete from booking where user_id = ?;', [id])
      await connection.query('delete from user where id = ?', [id])

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
      `UPDATE user SET ${fieldsToUpdate} WHERE id = ?`,
      values
    );

    return { success: true, id, updatedFields: input };
  }
}