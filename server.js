const express = require('express')
const http = require('http')

const socketIO = require('socket.io')

const port = 4002

const app = express()

const server = http.createServer(app)

const io = socketIO(server)

io.on('connection', function(socket) {
  console.log('Usuário conectado: ', socket.id)

  socket.on('disconnect', () => {
    console.log('Usuário desconectado: ', socket.id)
  })

  socket.on('ENVIA_MENSAGEM', function (message) {
    console.log('Enviado: ', message)
    io.emit('RECEBE_MENSAGEM', message)
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))