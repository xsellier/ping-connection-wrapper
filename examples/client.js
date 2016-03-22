'use strict'

const net = require('net')
const netWrapper = require('./index')

const client = net.connect(3000)

netWrapper(client)

client.ping()
