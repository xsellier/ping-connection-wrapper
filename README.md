ping-connection-wrapper
=======================

Wrap an existing connection to send/receive a ping/pong

## Usage

See [examples](./examples)

#### Server side
``` js
'use strict'

const net = require('net')
const netWrapper = require('./index')

net.createServer(function(client) {
  // create one server per connection
  netWrapper(client)
}).listen(3000)
```

#### Client side
``` js
'use strict'

const net = require('net')
const netWrapper = require('./index')

const client = net.connect(3000)

netWrapper(client)

client.ping()
```

## Installation

### Installing password-maker
```
  npm install ping-connection-wrapper --save
```

## Run Tests
Tests are written with mocha/chai.

``` bash
  $ npm test
```

## Changelog
1.0.0

- No test implemented
- Some examples given
- First working version
