import { useState } from "react";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
  padding: 4,
};

const Blog = ({ blog, onPressLike = () => {}, onPressRemove = () => {} }) => {
  const [detailView, setDetailView] = useState(false);

  const toggleView = () => {
    setDetailView((prev) => !prev);
  };

  const onRemove = (event) => {
    event.stopPropagation();
    const shouldProceed = confirm(
      `Remove the blog ${blog?.title} by ${blog?.author}`
    );
    if (shouldProceed) {
      onPressRemove();
    }
  };

  return (
    <div style={blogStyle}>
      <strong>
        {blog?.title} by {blog?.author}
      </strong>{" "}
      <button onClick={toggleView}>{!detailView ? "view" : "hide"}</button>
      {!!detailView && (
        <div>
          <a href={blog?.url}>{blog?.url}</a>
          <div>
            likes {blog?.likes} <button onClick={onPressLike}>like</button>
          </div>
          added by {blog?.user?.name}
          <div>
            <button onClick={onRemove}>remove</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
