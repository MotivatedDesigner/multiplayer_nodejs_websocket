const http = require("http")
const httpSrver = http.createServer()
const websocketServer = require("websocket").server

httpSrver.listen(3030, console.log('fofofo'))

const wsSocket = new websocketServer({
  "httpServer": httpSrver
})
