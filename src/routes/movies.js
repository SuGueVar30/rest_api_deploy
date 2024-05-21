import { Router } from 'express'
import { MovieController } from '../controllers/movies.js'
export const moviesRouter = Router()

moviesRouter.get('/', MovieController.getAll) // PAGINA DE INICIO
moviesRouter.get('/:id', MovieController.getById) /// RECUPERAR LAS PELÍCULAS POR ID

moviesRouter.post('/', MovieController.create) /// CREAR UNA PELÍCULA
moviesRouter.patch('/:id', MovieController.update) /// ACTUALIZAR UNA PELÍCULA
moviesRouter.delete('/:id', MovieController.delete) /// ELIMINAR UNA PELÍCULA
