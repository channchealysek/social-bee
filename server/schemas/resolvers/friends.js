const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../../models")
const { authMiddleware } = require("../../utils/auth");

module.exports = {
  Mutation: {
    addFriend: async (_, {friendId} , context) => {
      const { id } = authMiddleware(context);
      const currentUser = await User.findById(id)
      const getFriend = await User.findById(friendId);
      if (getFriend) {
        currentUser.friends.unshift({
          username:getFriend.username,
          createdAt: new Date().toISOString(),
        });
        await currentUser.save();
        return currentUser;
      } else throw new AuthenticationError("You are not login.");
    },
 
  },
};
