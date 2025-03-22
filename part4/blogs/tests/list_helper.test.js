const { test, describe } = require("node:test");
const assert = require("node:assert");

const {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
} = require("../utils/list_helper");
const {
  listWithOneBlog,
  blogs,
  favoriteBlogSingular,
  favoriteBlogAmongMultiple,
  mostBlogSingular,
  mostBlogAmongMultiple,
} = require("./constants");

test("dummy returns one", () => {
  const result = dummy([]);
  assert.strictEqual(result, 1);
});

describe("total likes", () => {
  test("of empty list is zero", () => {
    const result = totalLikes([]);
    assert.strictEqual(result, 0);
  });

  test("when list has only one blog, equals the likes of that", () => {
    const result = totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });

  test("of a bigger list is calculated right", () => {
    const result = totalLikes(blogs);
    assert.strictEqual(result, 36);
  });
});

describe("favourite blog", () => {
  test("of empty list is empty", () => {
    const result = favoriteBlog([]);
    assert.deepStrictEqual(result, {});
  });

  test("when list has only one blog, equals the blog", () => {
    const result = favoriteBlog(listWithOneBlog);
    assert.deepStrictEqual(result, favoriteBlogSingular);
  });

  test("of a bigger list is calculated right", () => {
    const result = favoriteBlog(blogs);
    assert.deepStrictEqual(result, favoriteBlogAmongMultiple);
  });
});

describe("most blogs", () => {
  test("of empty list is empty", () => {
    const result = mostBlogs([]);
    assert.deepStrictEqual(result, {});
  });

  test("when list has only one blog, equals the blog", () => {
    const result = mostBlogs(listWithOneBlog);
    assert.deepStrictEqual(result, mostBlogSingular);
  });

  test("of a bigger list is calculated right", () => {
    const result = mostBlogs(blogs);
    assert.deepStrictEqual(result, mostBlogAmongMultiple);
  });
});
