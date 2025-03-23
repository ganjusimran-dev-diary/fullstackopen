const { test, after, describe, beforeEach, before } = require("node:test");
require("express-async-errors");
const bcrypt = require("bcrypt");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const Blog = require("../models/blogs");
const User = require("../models/users");
const {
  testUsers,
  primaryUser,
  secondaryUser,
  singleBlogToSave,
  invalidBlogToSave,
  apiTestInitialBlog,
  singleBlogWithoutLikes,
} = require("./constants");
const { usersInDb } = require("./test_helper");

const api = supertest(app);

let token;
let secondaryToken;

beforeEach(async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});
  const userPromises = testUsers.map(async (user) => {
    const passwordHash = await bcrypt.hash(user?.password, 10);
    return new User({ username: user?.username, passwordHash }).save();
  });
  await Promise.all(userPromises);

  const users = await usersInDb({ username: primaryUser?.username });
  const userId = users[0]?.id || "";
  const blogObjects = apiTestInitialBlog.map(
    (blog) => new Blog({ ...blog, user: userId })
  );
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);

  const loginResponse = await api.post("/api/login").send(primaryUser);
  token = loginResponse.body.token;
  const loginResponseSecondary = await api
    .post("/api/login")
    .send(secondaryUser);
  secondaryToken = loginResponseSecondary.body.token;
});

describe("Test BLOG Schema: API to GET Blogs", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("blogs throw 410 unauthorised if token not set", async () => {
    await api.get("/api/blogs").expect(401);
  });

  test("all blogs are returned", async () => {
    const response = await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${token}`);
    assert.strictEqual(response.body.length, apiTestInitialBlog?.length);
  });

  test("the first blog is about React patterns", async () => {
    const response = await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${token}`);

    const title = response.body.map((e) => e.title);
    assert(title.includes(apiTestInitialBlog?.[0]?.title || ""));
  });

  test("blog posts have id instead of _id", async () => {
    const response = await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${token}`);

    const blog = response.body?.[0] || {};
    assert(blog.hasOwnProperty("id"));
    assert.strictEqual(blog.hasOwnProperty("_id"), false);
  });
});

describe("Test BLOG Schema: API to POST Blogs", () => {
  test("a valid blog can be added", async () => {
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(singleBlogToSave)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const blogsAfterSave = await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${token}`);
    assert.strictEqual(
      blogsAfterSave.body.length,
      apiTestInitialBlog?.length + 1
    );
  });

  test("missing likes property is set to 0", async () => {
    const savedBlog = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(singleBlogWithoutLikes);
    assert.strictEqual(savedBlog.body?.likes, 0);
  });

  test("missing url property throws 400 bad request", async () => {
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(invalidBlogToSave)
      .expect(400);
  });

  test("missing token throws 401 unauthorised", async () => {
    await api.post("/api/blogs").send(invalidBlogToSave).expect(401);
  });
});

describe("Test BLOG Schema: API to DELETE blogs", () => {
  test("wrong blog id throws 400 Bad Request", async () => {
    await api
      .delete("/api/blogs/67def6db1052d0fdf1b638c7d")
      .set("Authorization", `Bearer ${token}`)
      .expect(400);
  });

  test("missing token throws 401 Unauthorised", async () => {
    await api.delete("/api/blogs/67def6db1052d0fdf1b638c7d").expect(401);
  });

  test("blog can be deleted only by user who added it", async () => {
    const response = await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${token}`);
    const firstBlog = response.body?.[0] || {};
    await api
      .delete(`/api/blogs/${firstBlog.id}`)
      .set("Authorization", `Bearer ${secondaryToken}`)
      .expect(401);
  });

  test("a valid blog can be deleted", async () => {
    const response = await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${token}`);
    const firstBlog = response.body?.[0] || {};
    await api
      .delete(`/api/blogs/${firstBlog.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    const getAfterDeletion = await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${token}`);
    assert.strictEqual(getAfterDeletion.body.length, response.body.length - 1);
  });

  test("a deleted blog throws 404 not found if deleted again", async () => {
    const response = await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${token}`);
    const firstBlog = response.body?.[0] || {};
    await api
      .delete(`/api/blogs/${firstBlog.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    await api
      .delete(`/api/blogs/${firstBlog.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });
});

describe("Test BLOG Schema: API to UPDATE blogs", () => {
  test("wrong blog id throws 400 Bad Request", async () => {
    await api
      .put("/api/blogs/67def6db1052d0fdf1b638c7d")
      .set("Authorization", `Bearer ${token}`)
      .send({ likes: 2 })
      .expect(400);
  });

  test("missing token throws 401 Unauthorised", async () => {
    await api
      .put("/api/blogs/67def6db1052d0fdf1b638c7d")
      .send({ likes: 2 })
      .expect(401);
  });

  test("blog can be updated only by user who added it", async () => {
    const response = await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${token}`);
    const firstBlog = response.body?.[0] || {};
    await api
      .put(`/api/blogs/${firstBlog.id}`)
      .set("Authorization", `Bearer ${secondaryToken}`)
      .expect(401);
  });

  test("a valid blog can be updated", async () => {
    const response = await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${token}`);
    const firstBlog = response.body?.[0] || {};
    await api
      .put(`/api/blogs/${firstBlog.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ likes: 2, title: "Test Blog" })
      .expect(200);
  });

  test("a valid blog returns no changes made if nothing got updated", async () => {
    const response = await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${token}`);
    const firstBlog = response.body?.[0] || {};
    await api
      .put(`/api/blogs/${firstBlog.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ likes: 2 })
      .expect(200);
    const result = await api
      .put(`/api/blogs/${firstBlog.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ likes: 2 })
      .expect(200);
    assert.strictEqual(result.body?.message, "No changes made");
  });

  test("throws 404 not found if user tries to update deleted blog", async () => {
    const response = await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${token}`);
    const deletedBlog = response.body?.[0] || {};
    await api
      .delete(`/api/blogs/${deletedBlog.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ likes: 2, title: "Testing update" })
      .expect(204);
    await api
      .put(`/api/blogs/${deletedBlog.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ likes: 2 })
      .expect(404);
  });
});

describe("Test USER Schema: when there is initially one user in db", () => {
  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: "ganjusimran",
      name: "Simran Ganju",
      password: "roronoa",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await usersInDb();
    assert(result.body.error.includes("expected `username` to be unique"));

    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  test("creation fails with 400 when username length is less than 3", async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: "ro",
      name: "Super",
      password: "pass",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await usersInDb();
    assert(result.body.error.includes("User validation failed"));

    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  test("creation fails with 400 when password length is less than 3", async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: "ro",
      name: "Super",
      password: "pa",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await usersInDb();
    assert(result.body.error.includes("User validation failed"));

    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });
});

after(async () => {
  await mongoose.connection.close();
});
