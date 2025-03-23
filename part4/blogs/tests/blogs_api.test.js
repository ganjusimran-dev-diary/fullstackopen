const { test, after, describe, beforeEach, expect } = require("node:test");
require("express-async-errors");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const Blog = require("../models/blogs");
const {
  singleBlog,
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

describe("API to fetch Blogs", () => {
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

describe("API to add Blogs", () => {
  test("a valid note can be added", async () => {
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

after(async () => {
  await mongoose.connection.close();
});
