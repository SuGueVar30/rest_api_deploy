import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  password: '55468255',
  database: 'MOVIESDB',
  port: 3307
}

const conex = await mysql.createConnection(config)

export class MovieModel {
  static async getAll ({ genre }) {
    const [movies] = await conex.query('SELECT BIN_TO_UUID(M.ID) AS ID, M.TITLE, M.YEAR, M.DIRECTOR, M.DURATION, M.POSTER, M.RATE, G.NAME AS GENRE FROM MOVIES_GENRE AS MG INNER JOIN MOVIES M ON M.ID = MG.M_ID INNER JOIN GENRE AS G ON G.ID = MG.G_ID;')
    if (genre) {
      movies.filter(
        (movie) => movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
      )
    }
    return movies
  }

  static async getById ({ id }) {
  }

  static async create ({ movie }) {
  }

  static async update ({ id, movie }) {
  }

  static async delete ({ id }) {
  }
}
