const bcrypt = require("bcrypt");
const { User } = require("../../models");
const { signToken } = require("../../utils/auth");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../utils/validators");
const { UserInputError } = require("apollo-server-express");

module.exports = {
  Query: {
    async getUsers() {
      try {
        const users = await User.find().sort({createdAt: -1 });
        console.log({users})
        return users;
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    async login(_, { username, password }) {
      const { valid, errors } = validateLoginInput(username, password);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ username });
      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found.", { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Wrong credentials.";
        throw new UserInputError("Wrong credentials.", { errors });
      }

      const token = signToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      // Validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      // Make sure user doesn't already exist
      const userExist = await User.findOne({ username });
      if (userExist) {
        throw new UserInputError("Username is taken", {
          errors: {
            username: "This username is taken",
          },
        });
      }
      // hash password and create and uth token
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const user = await newUser.save();
      const token = signToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
  },
};
