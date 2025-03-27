require("dotenv").config();
require("express-async-errors");
const blogsRouter = require("express").Router();
const Blog = require("../models/blogs");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  if (blogs) {
    response.json(blogs);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post("/", async (request, response) => {
  const user = request.user;

  const { title, author, url, likes = 0 } = request.body;

  const blog = new Blog({ title, author, url, likes, user: user.id });
  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.put("/:id", async (request, response) => {
  const user = request.user;
  const id = request.params?.id || "";
  const blog = await Blog.findById(id);
  if (!blog) {
    return response.status(404).json({ error: "Blog not found" });
  }
  // if (blog.user.toString() === user?.id.toString()) {
  let filteredData;
  if (blog.user.toString() === user?.id.toString()) {
    filteredData = Object.fromEntries(
      Object.entries(request.body).filter(
        ([_, v]) => v === 0 || v !== undefined
      )
    );
  } else {
    blog.likes = request.body.likes;
    filteredData = blog;
  }
  const result = await Blog.updateOne(
    { _id: id },
    { $set: filteredData },
    { runValidators: true }
  );

  if (result.modifiedCount === 0) {
    return response.json({ message: "No changes made" });
  } else {
    return response.json({
      message: `Blog with id:${id} updated successfully`,
    });
  }

  // } else {
  //   response.status(401);
  //   response.send({ error: "You do not have permissio to perfom this action" });
  // }
});

blogsRouter.delete("/:id", async (request, response) => {
  // const user = request.user;
  const id = request.params.id;
  const blog = await Blog.findById(id);
  if (!blog) {
    return response.status(404).send({ error: "Could not find resource" });
  }
  // if (blog.user.toString() === user?.id.toString()) {
  await Blog.findByIdAndDelete(id);
  response.status(204).end();
  // } else {
  //   response.status(401);
  //   response.send({ error: "You do not have permissio to perfom this action" });
  // }
});

module.exports = blogsRouter;
