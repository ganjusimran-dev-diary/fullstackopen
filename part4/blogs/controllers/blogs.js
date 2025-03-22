const blogsRouter = require("express").Router();
const Blog = require("../models/blogs");

blogsRouter.get("/", (request, response) => {
  Blog.find({})
    .then((blogs) => {
      response.json(blogs);
    })
    .catch((error) => next(error));
});

blogsRouter.post("/", (request, response, next) => {
  const { title, author, url, likes = 0 } = request.body;

  const blog = new Blog({ title, author, url, likes });

  blog
    .save()
    .then((savedNote) => {
      response.json(savedNote);
    })
    .catch((error) => next(error));
});

module.exports = blogsRouter;
