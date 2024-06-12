// Módulos nativos
const http = require('node:http')
const fs = require('node:fs')

const desiredPort = process.env.PORT ?? 3000

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf8')

  if (req.url === '/') {
    res.statusCode = 200
    res.end('Bienvenido a mi página de inicio')
  } else if (req.url === '/imagen-bonita') {
    fs.readFile('./copyright.png', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('500')
      } else {
        res.statusCode = 200
        res.setHeader('Content-Type', 'image/png')
        res.end(data)
      }
    })
  } else if (req.url === '/login') {
    res.statusCode = 200
    res.end('Bienvenido a mi página de login')
  } else {
    res.statusCode = 404
    res.end('404')
  }
}

// Creo servidor
const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`Server levantado en el puerto http://localhost:${desiredPort}`)
})
