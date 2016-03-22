'use strict'

const net = require('net')
const netWrapper = require('./index')

net.createServer(function(client) {
  // create one server per connection
  netWrapper(client)
}).listen(3000)
