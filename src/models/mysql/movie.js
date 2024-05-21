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
    if (genre) {
      const [moviesGenre] = await conex.query('SELECT BIN_TO_UUID(M.ID) AS ID, M.TITLE, M.YEAR, M.DIRECTOR, M.DURATION, M.POSTER, M.RATE, G.NAME AS GENRE FROM MOVIES_GENRE AS MG INNER JOIN MOVIES M ON M.ID = MG.M_ID INNER JOIN GENRE AS G ON G.ID = MG.G_ID WHERE G.NAME = ? ;', genre.toUpperCase())
      if (moviesGenre.length > 0) {
        return moviesGenre
      } else {
        return []
      }
    }

    const [movies] = await conex.query('SELECT BIN_TO_UUID(M.ID) AS ID, M.TITLE, M.YEAR, M.DIRECTOR, M.DURATION, M.POSTER, M.RATE, G.NAME AS GENRE FROM MOVIES_GENRE AS MG INNER JOIN MOVIES M ON M.ID = MG.M_ID INNER JOIN GENRE AS G ON G.ID = MG.G_ID;')
    if (movies.length > 0) {
      return movies
    } else {
      return []
    }
  }

  static async getById ({ id }) {
    if (id) {
      const [movies] = await conex.query('SELECT BIN_TO_UUID(M.ID) AS ID, M.TITLE, M.YEAR, M.DIRECTOR, M.DURATION, M.POSTER, M.RATE, G.NAME AS GENRE FROM MOVIES_GENRE AS MG INNER JOIN MOVIES M ON M.ID = MG.M_ID INNER JOIN GENRE AS G ON G.ID = MG.G_ID WHERE M.ID = UUID_TO_BIN( ? );', id)
      if (movies.length > 0) {
        return movies
      } else {
        return []
      }
    }
  }

  static async create ({ input }) {
  }

  static async update ({ id, movie }) {
  }

  static async delete ({ id }) {
  }
}
