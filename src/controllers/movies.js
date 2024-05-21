// import { MovieModel } from '../models/mysql/movies.js'
import { MovieModel } from '../models/mysql/movie.js'
import { validatedMovie, validatedPartialMovie } from '../schemas/moviesSchemas.js'

export class MovieController {
  static async getAll (req, res) {
    const { genre } = req.query
    const _movies = await MovieModel.getAll({ genre })
    if (_movies.length === 0) return res.status(404).render('error', { message: '404 - Movie not found.' })
    return res.render('movies', { movies: _movies })
  }

  static async getById (req, res) {
    const { id } = req.params
    const _movie = await MovieModel.getById({ id }).catch(() => {
      return res.status(500).render('error', { message: '500 - Invalid ID.' })
    })

    if (_movie.length === 0) return res.status(404).render('error', { message: '404 - Movie not found.' })
    return res.render('movies', { movies: _movie })
  }

  static async create (req, res) {
    const result = validatedMovie(req.body)
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const newMovie = await MovieModel.create({ movie: result.data })
    res.status(201).json(newMovie)
  }

  static async update (req, res) {
    const result = validatedPartialMovie(req.body)
    if (result.error) return res.status(400).json({ error: JSON.parse(result.error.message) })
    const { id } = req.params
    const updateMovie = await MovieModel.update({ id, movie: result.data })
    return res.status(201).json(updateMovie)
  }

  static async delete (req, res) {
    const { id } = req.params
    const result = await MovieModel.delete({ id })
    if (result === false) return res.status(404).json({ message: 'Movie not found.' })
    return res.json({ message: 'Movie deleted.' })
  }
}
