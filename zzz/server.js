// server.js
console.log('in server.js')

var jsonServer = require('json-server')
var server = jsonServer.create()

const path = require('path')
const router = jsonServer.router(path.join(__dirname, 'db.json'))

var middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)
server.listen(4000, function () {
  console.log('JSON Server is running')
})