import express from 'express'
import logger from 'morgan'
import process from 'process'; // Add this line to import the 'process' module

import { Server } from 'socket.io' //Constructor de una conexión web 
import { createServer } from 'node:http'

const port = process.env.PORT ?? 3000

const app = express()
const server = createServer(app)
const io = new Server(server)

io.on('connection', (socket) => {
  console.log('a user has been connected')

  socket.on('disconnect', () => {
    console.log('a user has been disconnected')
  })

  socket.on('chat message', (message) => {
    io.emit('chat message', message)
  })
})

app.use(logger('dev'))


app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html')
})

server.listen(port, () => {
  console.log(`Servidor iniciado en puerto ${port}`)
})