// Require dependencies
const TokenBucket = require("@d3vision/ip-token-bucket");
const rateLimitedUsers = {};

const socketIORateLimiter = (config, socket) => {
  const { proxy, maxBurst, perSecond, gracePeriodInSeconds, emitClientHtmlError, emitConsoleError } = config;
  if(!maxBurst || !perSecond || !gracePeriodInSeconds) throw new Error("Missing required parameters for socket.io rate limiter");

  // Make a new IP bucket
  const bucket = new TokenBucket({
    maxBurst,
    perSecond,
  });

  return (packet, next) => {
    // Get client IP
    const remoteAddress = socket.request.socket.remoteAddress;
    const xForwardedFor = proxy
      ? String(socket.handshake.headers["cf-connecting-ip"]).split(",")[0]
      : false;
    // If using proxy, use headers instead
    const ipAddress = xForwardedFor || remoteAddress;

    // If user is allowed to make this request
    try {
      if (rateLimitedUsers[ipAddress]?.limited) {
        // User is within the grace period
        const error = new Error("Rate limited, please wait.");
        error.data = {
          message: "Rate limited, please wait.",
        };
        throw error;
      } else if (!bucket.take(ipAddress)) {
        // User is rate-limited
        rateLimitedUsers[ipAddress] = {limited: true, time: (Date.now()+gracePeriodInSeconds * 1000)};

        setTimeout(() => {
          delete rateLimitedUsers[ipAddress];
        }, gracePeriodInSeconds * 1000); // Convert to milliseconds

        const error = new Error("Rate limited, please wait.");
        error.data = {
          message: "Rate limited, please wait.",
        };
        throw error;
      } else {
        // User is allowed
        next();
      }
    } catch (error) {
      if(emitClientHtmlError){
        socket.emit("rate_limit_exceeded", { error: true, message: `Please wait <b>${rateLimitedUsers[ipAddress]?.time ? (Math.ceil((rateLimitedUsers[ipAddress].time - Date.now()) / 1000)) : 15} seconds</b> before using <b>any</b> features again. Thank you.`});
      }
      if(emitConsoleError){
        console.error("Middleware error:", error.message);
      }
    }
  };
};

// Export function
module.exports = socketIORateLimiter;