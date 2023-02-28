const { json } = require("express");
const Post = require("../models/Post");

const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json({ posts });
  } catch (error) {
    console.log(error);
    next(error);
  }

  res.send("get all posts route ");
};
const createPost = async (req, res, next) => {
  let { title, body } = req.body;
  let post = new Post(title, body);
  post = await post.save();
  res.send("this is create post route");
};
const updatePost = async (req, res, next) => {
  res.send("get updatePost route ");
};
const deletePost = async (req, res, next) => {
  res.send("get deletePost route ");
};

module.exports = { getPosts, createPost, updatePost, deletePost };
