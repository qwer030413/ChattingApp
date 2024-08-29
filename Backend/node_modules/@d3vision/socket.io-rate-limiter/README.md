# socket.io-rate-limiter
A Socket.IO middleware for implementing rate limiting based on token buckets. Prevents excessive requests by enforcing a maximum request rate and provides a configurable grace period for rate-limited users.

## Usage

Install the package by typing `npm i @d3vision/socket.io-rate-limiter` in your project folder.

### Setup

```javascript
const socketIORateLimiter = require("@d3vision/socket.io-rate-limit");

/* ... get access to socket.io's main object */
io.on("connection", socket => {
  // Setup rate limiting middleware
  socket.use(
    socketIORateLimiter({ proxy: true, maxBurst: 5, perSecond: 1, gracePeriodInSeconds: 15, emitClientHtmlError: true }, socket)
  );
  /* ... your code below */
});
```

## Methods

### socketIORateLimiter

Pass this with the config as an middleware to `io.use()`.

#### Parameters

- config (ConfigObject)
- socket (SocketIO#Socket)

#### Returns

- Function (SocketIO#Middleware)

## Objects

### ConfigObject

Object which holds all configuration values for the middleware.

#### Example

```javascript
const config = {
  // If the socket server is running behind a proxy (nginx, haproxy, etc.) this is used when getting the client IP from the websocket request.
  proxy: true,

  // Bucket size (starting amount of tokens in the bucket, each request = -1 token)
  maxBurst: 5,

  // How many tokens will be added back into the bucket per second
  perSecond: 1,

  // How many seconds the user will be "jailed" until they can submit requests again
  gracePeriodInSeconds: 15,

  // Dictates if the `rate_limit_exceeded` event is emited back to the socket containing an error message and the amount of seconds remaining until the grace period has run out
  emitClientHtmlError: true,

  // Dictates if rate limit hits are logged to the console
  emitConsoleError: true
};

io.use(socketIORateLimiter(config));
```

## License

MIT
