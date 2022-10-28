const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../../models")
const { authMiddleware } = require("../../utils/auth");

module.exports = {
  Mutation: {
    addFriend: async (_, { userId, friendId }, context) => {
      const { username } = authMiddleware(context);
      const userAddFriend = await User.findById(userId);
      const userFriendToAdd = await User.findById(friendId);

      if (userAddFriend) {
        userAddFriend.friends.unshift({
          _id:friendId,
          username:userFriendToAdd.username,
          email:userFriendToAdd.email,
          createdAt: new Date().toISOString(),
        });
        await userAddFriend.save();
        return userAddFriend;
      } else throw new UserInputError("Us not found");
    }
  },
};
