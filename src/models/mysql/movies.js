import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'moviesdb',
  port: 3306
}

const Conex = mysql.createConnection(config)

export class MovieModel {
  static async getAll ({ genre }) {
    const result = await Conex.query('SELECT * FROM MOVIES ORDER BY TITTLE ASC')
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
