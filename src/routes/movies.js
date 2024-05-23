import { Router } from 'express'
import { MovieController } from '../controllers/movies.js'

export const createMovieRouter = ({ movieModel }) => {
  const moviesRouter = Router()

  const movieController = new MovieController({ movieModel })

  moviesRouter.get('/', movieController.getAll) // PAGINA DE INICIO
  moviesRouter.get('/:id', movieController.getById) /// RECUPERAR LAS PELÍCULAS POR ID

  moviesRouter.post('/', movieController.create) /// CREAR UNA PELÍCULA
  moviesRouter.patch('/:id', movieController.update) /// ACTUALIZAR UNA PELÍCULA
  moviesRouter.delete('/:id', movieController.delete) /// ELIMINAR UNA PELÍCULA

  return moviesRouter
}
