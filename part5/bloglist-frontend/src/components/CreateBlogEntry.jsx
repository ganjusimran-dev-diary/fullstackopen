import { useEffect, useState } from "react";

const CreateBlogEntry = ({ onCreateNewBlog, onCancel }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    return () => {
      clearInputs();
    };
  }, []);

  const clearInputs = () => {
    setTitle("");
    setAuthor("");
    setTitle("");
  };

  const onCreateBlog = (event) => {
    event.preventDefault();
    onCreateNewBlog(title, author, url, clearInputs);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreateBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            placeholder="enter title"
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            placeholder="enter author"
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="url"
            value={url}
            placeholder="enter url"
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
      <button onClick={onCancel}>cancel</button>
    </div>
  );
};

export default CreateBlogEntry;
