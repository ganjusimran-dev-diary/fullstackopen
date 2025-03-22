const dummy = (blogs) => {
  // ...
  return 1;
};

const totalLikes = (blogs) => {
  return !blogs?.length
    ? 0
    : blogs.reduce((total, blog) => total + (blog?.likes || 0), 0);
};

const favoriteBlog = (blogs) => {
  if (!blogs?.length) return {};

  let mostLiked = blogs[0];

  for (let i = 1; i < blogs?.length; i++) {
    if (blogs[i]?.likes > mostLiked.likes) {
      mostLiked = blogs[i];
    }
  }

  const { title, author, likes } = mostLiked;

  return {
    title,
    author,
    likes,
  };
};

const mostBlogs = (blogs) => {
  if (!blogs?.length) return {};

  let blogsCountMap = {};

  let maxBlogsAuthor = {
    author: "",
    blogs: 0,
  };

  for (let i = 0; i < blogs?.length; i++) {
    const author = blogs[i]?.author || "";
    if (!author) {
      continue;
    }
    if (!blogsCountMap[author]) {
      blogsCountMap[author] = 1;
    } else {
      blogsCountMap[author] += 1;
    }
    if (blogsCountMap[author] > maxBlogsAuthor?.blogs) {
      maxBlogsAuthor = {
        author,
        blogs: blogsCountMap[author],
      };
    }
  }

  return maxBlogsAuthor;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
