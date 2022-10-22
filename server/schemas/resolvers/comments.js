const { UserInputError, AuthenticationError } = require("apollo-server-express");
const { Post } = require("../../models");
const { authMiddleware } = require("../../utils/auth");

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { username } = authMiddleware(context);
      if (body.trim() === "") {
        throw new UserInputError("Empty comment", {
          errors: {
            body: "Comment body must not empty",
          },
        });
      }

      const post = await Post.findById(postId);

      if (post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });
        await post.save();
        return post;
      } else throw new UserInputError("Post not found");
    },
    async deleteComment(_, { postId, commentId }, context) {
        const { username } = authMiddleware(context);

        const post = await Post.findById(postId);

        if(post) {
            const commentIndex = post.comments.findIndex(c => c.id === commentId);
            if(post.comments[commentIndex].username === username) {
                post.comments.splice(commentIndex, 1);
                await post.save();
                return post;
            } else {
                throw new AuthenticationError('Action not allowed');
            }
        }else {
            throw new UserInputError('Post not found');
        }
    }
  },
};
