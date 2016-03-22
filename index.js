'use strict'

const PING = 'PING'
const PONG = 'PONG'

const wrap = function(connection, options) {
  if (connection.ping != null || connection.stopPing != null) {
    throw new Error('Connection already wrapped !')
  }

  options = options || {}

  let pingAllowed = false
  let pinging = false
  let timedout = null
  let interval = options.interval || 30000
  let timeout = options.timeout || 120000

  const ping = function() {
    if (pingAllowed) {
      pinging = true
      connection.write(PING)

      if (timedout != null) {
        clearTimeout(timedout)
      }

      timedout = setTimeout(ping, timeout)
    }
  }

  const pongReceived = function() {
    if (pinging) {
      pinging = false

      clearTimeout(timedout)
      setTimeout(ping, interval)
    }
  }

  connection.ping = function() {
    if (!pingAllowed) {
      pingAllowed = true

      ping()
    }
  }

  connection.stopPing = function() {
    pingAllowed = true
  }

  connection.on('data', function(data) {
    // buffer to string
    data = data.toString()

    switch(data) {
      case PONG:
        pongReceived()
      break

      case PING:
        connection.write(PONG)
      break
    }
  })

  connection.on('end', function() {
    pingAllowed = false
  })
}

module.exports = wrap
