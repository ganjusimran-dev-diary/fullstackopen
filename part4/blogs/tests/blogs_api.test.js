const { test, after, describe, beforeEach, expect } = require("node:test");
require("express-async-errors");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const Blog = require("../models/blogs");
const {
  singleBlogToSave,
  invalidBlogToSave,
  apiTestInitialBlog,
  singleBlogWithoutLikes,
} = require("./constants");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = apiTestInitialBlog.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe("Test Block for: API to GET Blogs", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body.length, apiTestInitialBlog?.length);
  });

  test("the first blog is about React patterns", async () => {
    const response = await api.get("/api/blogs");

    const title = response.body.map((e) => e.title);
    assert(title.includes(apiTestInitialBlog?.[0]?.title || ""));
  });

  test("blog posts have id instead of _id", async () => {
    const response = await api.get("/api/blogs");

    const blog = response.body?.[0] || {};
    assert(blog.hasOwnProperty("id"));
    assert.strictEqual(blog.hasOwnProperty("_id"), false);
  });
});

describe("Test Block for: API to POST Blogs", () => {
  test("a valid blog can be added", async () => {
    await api
      .post("/api/blogs")
      .send(singleBlogToSave)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const blogsAfterSave = await api.get("/api/blogs");
    assert.strictEqual(
      blogsAfterSave.body.length,
      apiTestInitialBlog?.length + 1
    );
  });

  test("missing likes property is set to 0", async () => {
    const savedBlog = await api.post("/api/blogs").send(singleBlogWithoutLikes);
    assert.strictEqual(savedBlog.body?.likes, 0);
  });

  test("missing url property throws 400 bad request", async () => {
    await api.post("/api/blogs").send(invalidBlogToSave).expect(400);
  });
});

describe("Test Block for: API to DELETE blogs", () => {
  test("wrong blog id throws 400 Bad Request", async () => {
    await api.delete("/api/blogs/67def6db1052d0fdf1b638c7d").expect(400);
  });

  test("a valid blog can be deleted", async () => {
    const response = await api.get("/api/blogs");
    const firstBlog = response.body?.[0] || {};
    await api.delete(`/api/blogs/${firstBlog.id}`).expect(204);

    const getAfterDeletion = await api.get("/api/blogs");
    assert.strictEqual(getAfterDeletion.body.length, response.body.length - 1);
  });

  test("a deleted blog throws 404 not found if deleted again", async () => {
    const response = await api.get("/api/blogs");
    const firstBlog = response.body?.[0] || {};
    await api.delete(`/api/blogs/${firstBlog.id}`).expect(204);

    await api.delete(`/api/blogs/${firstBlog.id}`).expect(404);
  });
});

describe("Test Block for: API to UPDATE blogs", () => {
  test("wrong blog id throws 400 Bad Request", async () => {
    await api
      .put("/api/blogs/67def6db1052d0fdf1b638c7d")
      .send({ likes: 2 })
      .expect(400);
  });

  test("a valid blog can be updated", async () => {
    const response = await api.get("/api/blogs");
    const firstBlog = response.body?.[0] || {};
    await api
      .put(`/api/blogs/${firstBlog.id}`)
      .send({ likes: 2, title: "Test Blog" })
      .expect(200);
  });

  test("a valid blog returns no changes made if nothing got updated", async () => {
    const response = await api.get("/api/blogs");
    const firstBlog = response.body?.[0] || {};
    await api.put(`/api/blogs/${firstBlog.id}`).send({ likes: 2 }).expect(200);
    const result = await api
      .put(`/api/blogs/${firstBlog.id}`)
      .send({ likes: 2 })
      .expect(200);
    assert.strictEqual(result.body?.message, "No changes made");
  });

  test("throws 404 not found if user tries to update deleted blog", async () => {
    const response = await api.get("/api/blogs");
    const deletedBlog = response.body?.[0] || {};
    await api
      .delete(`/api/blogs/${deletedBlog.id}`)
      .send({ likes: 2, title: "Testing update" })
      .expect(204);
    await api
      .put(`/api/blogs/${deletedBlog.id}`)
      .send({ likes: 2 })
      .expect(404);
  });
});

after(async () => {
  await mongoose.connection.close();
});
