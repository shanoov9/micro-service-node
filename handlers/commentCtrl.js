const Comment = require("../models/comment");
const User = require("../models/userModel");
const sequelize = require("../configs/database");

exports.createComment = async (event) => {
  await sequelize.sync(); // Sync database models

  const { userId, comment } = JSON.parse(event.body);

  try {
    // Ensure the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "User not found" }),
      };
    }

    const newComment = await Comment.create({ userId, comment });
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Comment created successfully",
        comment: newComment,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to create comment",
        details: error.message,
      }),
    };
  }
};
exports.getUserComments = async (event) => {
  await sequelize.sync(); // Sync database models

  const userId = event.pathParameters.userId;

  try {
    const comments = await Comment.findAll({ where: { userId } });

    if (comments.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "No comments found for this user" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(comments),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to retrieve comments",
        details: error.message,
      }),
    };
  }
};
