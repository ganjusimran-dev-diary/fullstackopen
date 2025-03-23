require("express-async-errors");
const blogsRouter = require("express").Router();
const Blog = require("../models/blogs");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  if (blogs) {
    response.json(blogs);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post("/", async (request, response) => {
  const { title, author, url, likes = 0 } = request.body;

  const blog = new Blog({ title, author, url, likes });
  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

module.exports = blogsRouter;
