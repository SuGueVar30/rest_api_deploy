import { validatedMovie, validatedPartialMovie } from '../schemas/moviesSchemas.js'

export class MovieController {
  constructor ({ movieModel }) {
    this.movieModel = movieModel
  }

  getAll = async (req, res) => {
    const { genre } = req.query
    const _movies = await this.movieModel.getAll({ genre })
    if (_movies.length === 0) return res.status(404).render('error', { message: '404 - Movie not found.' })
    return res.render('movies', { movies: _movies })
  }

  getById = async (req, res) => {
    const { id } = req.params
    const _movie = await this.movieModel.getById({ id }).catch(() => {
      return res.status(500).render('error', { message: '500 - Invalid ID.' })
    })

    if (_movie.length === 0) return res.status(404).render('error', { message: '404 - Movie not found.' })
    return res.render('movies', { movies: _movie })
  }

  create = async (req, res) => {
    const result = validatedMovie(req.body)
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const newMovie = await this.movieModel.create({ movie: result.data })
    res.status(201).json(newMovie)
  }

  update = async (req, res) => {
    const result = validatedPartialMovie(req.body)
    if (result.error) return res.status(400).json({ error: JSON.parse(result.error.message) })
    const { id } = req.params
    const updateMovie = await this.movieModel.update({ id, movie: result.data })
    return res.status(201).json(updateMovie)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const result = await this.movieModel.delete({ id })
    if (!result) return res.status(404).json({ message: 'Movie not found.' })
    return res.json({ message: 'Movie deleted.' })
  }
}
