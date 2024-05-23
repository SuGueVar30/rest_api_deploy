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
      const [moviesGenre] = await conex.query(
        `
        SELECT BIN_TO_UUID(M.ID) AS ID, M.TITLE, M.YEAR, M.DIRECTOR, M.DURATION, M.POSTER, M.RATE, M.SYNOPSIS, G.NAME AS GENRE
        FROM MOVIES_GENRE AS MG
        INNER JOIN MOVIES M ON M.ID = MG.M_ID
        INNER JOIN GENRE AS G ON G.ID = MG.G_ID
        WHERE G.NAME = ? 
        ORDER BY M.YEAR DESC, M.RATE ASC;
        `
        , genre.toUpperCase())

      if (moviesGenre.length > 0) {
        return moviesGenre
      } else {
        return []
      }
    }

    const [movies] = await conex.query(
      `
      SELECT BIN_TO_UUID(M.ID) AS ID, M.TITLE, M.YEAR, M.DIRECTOR, M.DURATION, M.POSTER, M.RATE, M.SYNOPSIS, G.NAME AS GENRE
      FROM MOVIES_GENRE AS MG
      INNER JOIN MOVIES M ON M.ID = MG.M_ID
      INNER JOIN GENRE AS G ON G.ID = MG.G_ID
      ORDER BY M.YEAR DESC, M.RATE ASC;
      `
    )

    if (movies.length > 0) {
      return movies
    } else {
      return []
    }
  }

  static async getById ({ id }) {
    if (id) {
      const [movies] = await conex.query(
        `
        SELECT BIN_TO_UUID(M.ID) AS ID, M.TITLE, M.YEAR, M.DIRECTOR, M.DURATION, M.POSTER, M.RATE, M.SYNOPSIS, G.NAME AS GENRE
        FROM MOVIES_GENRE AS MG 
        INNER JOIN MOVIES M ON M.ID = MG.M_ID 
        INNER JOIN GENRE AS G ON G.ID = MG.G_ID 
        WHERE M.ID = UUID_TO_BIN( ? );`
        , id)
      if (movies.length > 0) {
        return movies
      } else {
        return []
      }
    }
  }

  static async create ({ movie }) {
    const newMovie = {
      TITLE: movie.title.toUpperCase(),
      YEAR: movie.year,
      DIRECTOR: movie.director.toUpperCase(),
      DURATION: movie.duration,
      POSTER: movie.poster,
      RATE: movie.rate,
      SYNOPSIS: movie.synopsis.toUpperCase()
    }

    const [newID] = await conex.query('SELECT UUID() AS UUID;')
    const [{ UUID }] = newID
    newMovie.ID = UUID
    try {
      await conex.query(
        `
        INSERT INTO MOVIES ( ID, TITLE, DIRECTOR, YEAR, DURATION, POSTER, RATE, SYNOPSIS) VALUES 
        (UUID_TO_BIN("${newMovie.ID}"), ?, ?, ?, ?, ?, ?, ?);
        `, [newMovie.TITLE, newMovie.DIRECTOR, newMovie.YEAR, newMovie.DURATION, newMovie.POSTER, newMovie.RATE, newMovie.SYNOPSIS])
    } catch (err) {
      throw new Error('Error:', 'Error creating new movie')
    }

    const [__movie] = await conex.query(
        `
        SELECT BIN_TO_UUID(M.ID) AS ID, M.TITLE, M.YEAR, M.DIRECTOR, M.DURATION, M.POSTER, M.RATE, M.SYNOPSIS
        FROM MOVIES AS M  
        WHERE M.ID = UUID_TO_BIN(?);
        `, newMovie.ID)

    return __movie[0]
  }

  static async update ({ id, movie }) {
    const newMovie = {
      ID: id,
      TITLE: movie.title.toUpperCase(),
      YEAR: movie.year,
      DIRECTOR: movie.director.toUpperCase(),
      DURATION: movie.duration,
      POSTER: movie.poster,
      RATE: movie.rate,
      SYNOPSIS: movie.synopsis.toUpperCase()
    }

    try {
      await conex.query(
        `
        UPDATE MOVIES SET TITLE = ?, DIRECTOR = ?, YEAR = ?, DURATION = ?, POSTER = ?, RATE = ?, SYNOPSIS = ?
        WHERE ID = UUID_TO_BIN('${newMovie.ID}');
        `, [newMovie.TITLE, newMovie.DIRECTOR, newMovie.YEAR, newMovie.DURATION, newMovie.POSTER, newMovie.RATE, newMovie.SYNOPSIS])
    } catch (err) {
      throw new Error('Error:', 'Error updating movie')
    }

    const [__movie] = await conex.query(
        `
        SELECT BIN_TO_UUID(M.ID) AS ID, M.TITLE, M.YEAR, M.DIRECTOR, M.DURATION, M.POSTER, M.RATE, M.SYNOPSIS
        FROM MOVIES AS M
        WHERE M.ID = UUID_TO_BIN("${newMovie.ID}");`
    )

    return __movie[0]
  }

  static async delete ({ id }) {
    try {
      await conex.query(`DELETE FROM  MOVIES WHERE ID = UUID_TO_BIN('${id}');`)
    } catch (err) {
      throw new Error('Error: ', 'Error deleting movie')
    }

    return true
  }
}
