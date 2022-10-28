const { AuthenticationError } = require("apollo-server-express");
const { Post } = require("../../models");
const { authMiddleware } = require("../../utils/auth");

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById({_id: postId});
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPostByUser(_, { userId }){
      try {
        console.log(userId)
        const post = await Post.findOne({user: userId});
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    async createPost(_, {body}, context) {
      const user = authMiddleware(context);

      if (body.trim() === '') {
        throw new Error('Post body must not be empty');
      }
      
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      });

      const post = await newPost.save();

      return post;
    },

    async updatePost(_, args, context) {
      const user = authMiddleware(context);
      if (args.body.trim() === '') {
        throw new Error('Post body must not be empty');
      }
      return Post.findOneAndUpdate({_id: args.postId}, {body: args.body}, {new:true});
    },

    async deletePost(_, { postId }, context) {
      const user = authMiddleware(context);

      try {
        const post = await Post.findById(postId);
        if(user.username === post.username) {
          await post.delete();
          return 'Post deleted successfully';
        }else{
          throw new AuthenticationError('Action not allowed');
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  }
};
