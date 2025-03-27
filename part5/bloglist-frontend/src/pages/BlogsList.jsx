import { useState, useEffect } from "react";

import blogService from "../services/blogs";
import { Blog, CreateBlogEntry, Notification } from "../components";

const BlogsList = ({ onLogout, user }) => {
  const [blogs, setBlogs] = useState([]);
  const [adddBlogView, setAddBlogView] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState({
    type: "success",
    text: "",
  });

  useEffect(() => {
    blogService.getAll().then((response) => {
      if (!response?.error) {
        setBlogs(response);
      } else {
        setNotificationMessage({ type: "error", text: response.error });
      }
    });
  }, []);

  const onClearNotification = () =>
    setNotificationMessage({
      type: "success",
      text: "",
    });

  const onCreateNewBlog = (title, author, url, clearInputs) => {
    blogService.addBlog({ title, author, url }).then((response) => {
      if (!response?.error) {
        setBlogs((prev) => [...prev, response]);
        setNotificationMessage({
          type: "success",
          text: `a new blog ${response?.title} by ${response.author} is added`,
        });
        clearInputs();
        setAddBlogView(false);
      } else {
        setNotificationMessage({ type: "error", text: response.error });
      }
    });
  };

  const onPressLike = (blog, pos) => {
    blog.likes += 1;
    blogService.updateBlog(blog?.id, blog).then((response) => {
      if (!response?.error) {
        const tempBlogs = [...blogs];
        tempBlogs[pos] = blog;
        setBlogs(tempBlogs);
        setNotificationMessage({
          type: "success",
          text: `blog ${blog.title} by ${blog.author} is updated`,
        });
      } else {
        setNotificationMessage({ type: "error", text: response.error });
      }
    });
  };

  const onPressRemove = (id, pos) => {
    blogService.deleteBlog(id).then((response) => {
      if (!response?.error) {
        const tempBlogs = [...blogs];
        tempBlogs.splice(pos, 1);
        setBlogs(tempBlogs);
        setNotificationMessage({
          type: "success",
          text: response?.message || `blog is deleted`,
        });
      } else {
        setNotificationMessage({ type: "error", text: response.error });
      }
    });
  };

  const onClickAddNew = () => {
    setAddBlogView(true);
  };

  const onCancel = () => {
    setAddBlogView(false);
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification
        show={!!notificationMessage?.text}
        message={notificationMessage?.text}
        type={notificationMessage?.type}
        onClearNotification={onClearNotification}
      />
      <span>
        {user?.name} is logged in <button onClick={onLogout}>logout</button>
      </span>
      {!adddBlogView ? (
        <p>
          <button onClick={onClickAddNew}>create new blog</button>
        </p>
      ) : (
        <CreateBlogEntry
          onCreateNewBlog={onCreateNewBlog}
          onCancel={onCancel}
        />
      )}

      <h3>list</h3>
      {blogs.map((blog, index) => (
        <Blog
          key={blog.id}
          blog={blog}
          onPressLike={() => onPressLike(blog, index)}
          onPressRemove={() => onPressRemove(blog?.id, index)}
        />
      ))}
    </div>
  );
};

export default BlogsList;
