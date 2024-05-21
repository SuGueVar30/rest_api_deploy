import express, { json } from 'express'
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirName = dirname(fileURLToPath(import.meta.url))
const dirViews = join(__dirName, '/views')
const dirPublic = join(__dirName, '/public')

const PORT = process.env.PORT || 3000

const app = express()

app.disable('x-powered-by')

/// USAR VISTAS
app.set('views', dirViews)
app.set('view engine', 'ejs')

/// USAR JSON
app.use(json())

/// USAR CORS
app.use(corsMiddleware())

/// USE STYLES
app.use(express.static(dirPublic))

/// HOME PAGE
app.get('/', (req, res) => {
  res.render('home')
})

/// MODULO MOVIES
app.use('/movies', moviesRouter)

/// CONEXIÓN
app.listen(PORT, () => {
  console.log(`Listening on PORT: http://localhost:${PORT}`)
})
