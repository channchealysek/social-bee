const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../../models")
const { authMiddleware } = require("../../utils/auth");

module.exports = {
  Mutation: {
    addFriend: async (_, { friendId }, context) => {
      const { username } = authMiddleware(context);
      const getFriend = await User.findById(friendId);
      if (getFriend) {
        getFriend.friends.unshift({
          username,
          createdAt: new Date().toISOString(),
        });
        await getFriend.save();
        return getFriend;
      } else throw new AuthenticationError("You are not login.");
    },
 
  },
};
