const express = require('express')
const ditto = require('./pokemon/ditto.json')

const PORT = process.env.PORT ?? 3000

const app = express()
// Para deshabilitar esta linea en las cabeceras de respuesta
app.disable('x-powered-by')

// Middleware para preprocesar
app.use(express.json())
// Equivalente
/* app.use((req, _res, next) => {
  if (req.method !== 'POST') return next()
  if (req.headers['content-type'] !== 'application/json') return next()

  let body = ''

  req.on('data', (chunk) => {
    body += chunk.toString()
  })

  req.on('end', () => {
    const data = JSON.parse(body)
    req.body = data
    next()
  })
}) */

app.get('/pokemon/ditto', (_req, res) => {
  res.json(ditto)
})

app.post('/pokemon', (req, res) => {
  req.body.timestamp = Date.now()
  res.status(201).json(req.body)
})

// Al ser la últiam se llega en caso de error
app.use((_req, res) => {
  res.status(404).send('<h1>404</h1>')
})

// Pongo al servidor a escuchar en el puerto
app.listen(PORT, () => {
  console.log(`Servidor levantado en puerto http://localhost:${PORT}`)
})
