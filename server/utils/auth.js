const { AuthenticationError } = require("apollo-server-express");

const jwt = require("jsonwebtoken");

const secret = "mysecretsshhhhh";
const expiration = "2h";

module.exports = {
  authMiddleware: function (context) {
    /// context = { ... headers }
    const authHeader = context.req.headers.authorization;
    if (authHeader) {
      // Bearer ....
      const token = authHeader.split("Bearer ")[1];
      if (token) {
        try {
          const user = jwt.verify(token, secret, { maxAge: expiration });
          return user;
        } catch (err) {
          throw new AuthenticationError("Invalid/Expired token");
        }
      }
      throw new Error("Authentication token must be 'Bearer [token]");
    }

    throw new Error("Authorization header must be provided");
  },
  signToken: function (user) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      secret,
      { expiresIn: "1h" }
    );
  },
};