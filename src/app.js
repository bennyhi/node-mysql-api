import express from 'express'
import morgan from 'morgan'
const cors = require('cors')

// Routes
const error = require('./red/errors')
import alianzaRoutes from './routes/alianza.routes'
import usuarioRoutes from './routes/usuario.routes'

const app = express()

//Settings
const config = require('./config')
app.set('port', config.app.port)
const corsOptions = {
  origin: config.app.clientUrl, optionsSuccessStatus: 200
}
app.use(cors())

//Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static('uploads'))

//Routes
app.use(error)
app.use("/api/alianzas", alianzaRoutes)
app.use("/api/usuarios", usuarioRoutes)


export default app;