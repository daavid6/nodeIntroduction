import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'PYNkTWDJLuCH3ej',
  database: 'movies_db'
}

const connection = await mysql.createConnection(config)

export class MovieModel {
  static async getAll ({ genre }) {
    if (!genre) {  
      const [movies] = await connection.query(
        'SELECT * FROM movie')
      return movies;
    }

    const [movies] = await connection.query(
      `SELECT m.* FROM movie m
      JOIN movie_genres mg ON m.id = mg.movie_id
      JOIN genre g ON mg.genre_id = g.id
      WHERE LOWER(g.name) = ?;`, 
      
      [genre.toLowerCase()]
    )
    return movies;   
  }

  static async getById ({ id }) {
    const [movies] = await connection.query(
      'SELECT *, BIN_TO_UUID(id) FROM movie WHERE id = UUID_TO_BIN(?);',
      [id]
    )

    return movies
   
  }

  static async create ({ input }) {
    
  }

  static async delete ({ id }) {
    
  }

  static async update ({ id, input }) {
    
  }
}