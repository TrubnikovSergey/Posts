const Post = require("../models/Post");
const User = require("../models/User");

const postsMock = require("../mock/posts.json");
const usersMock = require("../mock/users.json");

module.exports = async () => {
  const posts = await Post.find();
  if (posts.length !== postsMock.length) {
    createInitialEntity(Post, postsMock);
  }

  const users = await User.find();
  if (users.length !== usersMock.length) {
    createInitialEntity(User, usersMock);
  }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item.id;
        const newItem = new Model(item);
        await newItem.save();

        return newItem;
      } catch (error) {
        return error;
      }
    })
  );
}
