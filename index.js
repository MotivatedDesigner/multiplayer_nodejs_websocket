const http = require("http")
const httpSrver = http.createServer()
const websocketServer = require("websocket").server
const { v4: uuidv4 } = require('uuid')

const clients = new Map()
const games = new Map()

httpSrver.listen(3030, console.log('fofofo'))
const wsSocket = new websocketServer({"httpServer": httpSrver})

wsSocket.on("request", request => {

  const connection = request.accept(null, request.origin)

  const clientId = uuidv4()
  clients.set(clientId, { connection })
  const payload = {
    "method": "connect",
    clientId
  }
  connection.send(JSON.stringify(payload))

  // connection.on('close', () => console.log('close'))

  // connection.on('open', () => {
    
  // })
  

  connection.on('message', message => {
    try{
      const data = JSON.parse(message.utf8Data)
      switch(data.method) {
        case 'create':
          const gameId = uuidv4()
          const game = { gameId }
          games.set(gameId, game)

          const connection = clients.get(data.clientId).connection
          if(!connection) throw new Error(`this client with id: ${data.clientId} !exist`)
          connection.send( JSON.stringify(game) )
        break

      }
    }
    catch (e){
      throw new Error('can\'t handle this kinde of data from client')
    }
  })

})