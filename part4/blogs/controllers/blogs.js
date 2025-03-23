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

blogsRouter.put("/:id", async (request, response) => {
  const id = request.params?.id || "";
  const filteredData = Object.fromEntries(
    Object.entries(request.body).filter(([_, v]) => v === 0 || v !== undefined)
  );
  const result = await Blog.updateOne(
    { _id: id },
    { $set: filteredData },
    { runValidators: true }
  );

  if (result.matchedCount === 0) {
    return response.status(404).json({ error: "Blog not found" });
  } else if (result.modifiedCount === 0) {
    return response.json({ message: "No changes made" });
  } else {
    return response.json({
      message: `Blog with id:${id} updated successfully`,
    });
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;
  const result = await Blog.findByIdAndDelete(id);
  if (!result) {
    response.status(404);
    response.send({ error: "Could not find resource" });
  } else {
    response.status(204).end();
  }
});

module.exports = blogsRouter;
