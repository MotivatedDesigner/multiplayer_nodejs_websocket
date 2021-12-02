const http = require("http")
const httpSrver = http.createServer()
const websocketServer = require("websocket").server
const { v4: uuidv4 } = require('uuid')

const clients = new Map()

httpSrver.listen(3030, console.log('fofofo'))
const wsSocket = new websocketServer({"httpServer": httpSrver})

wsSocket.on("request", request => {
  console.log('request',request)

  const connection = request.accept(null, request.origin)

  connection.on('open', () => console.log('open'))
  connection.on('close', () => console.log('close'))
  connection.on('message', message => {
    
  })

  const clientId = uuidv4()
  clients.set(clientId, {
    connection
  })
  
})