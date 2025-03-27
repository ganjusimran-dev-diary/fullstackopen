import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../components/Blog";
import CreateBlogEntry from "../components/CreateBlogEntry";

test("renders blogs", () => {
  const blog = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    id: "67dff1ceec939efa91fa4435",
  };

  const { container } = render(<Blog blog={blog} />);

  const strong = container.querySelector(".blogTitle");
  expect(strong).toHaveTextContent("Canonical string reduction");
});

test("clicking the view button opens blog's detail", async () => {
  const blog = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    id: "67dff1ceec939efa91fa4435",
  };

  const { container } = render(<Blog blog={blog} />);
  const parentDiv = container.querySelector(".blog");
  expect(parentDiv).not.toHaveTextContent(
    "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html"
  );

  const user = userEvent.setup();
  const button = container.querySelector(".viewBlog");
  await user.click(button);

  expect(parentDiv).toHaveTextContent(
    "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html"
  );
  expect(parentDiv).toHaveTextContent(12);
});

test("clicking the like button calls the like handler", async () => {
  const blog = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    id: "67dff1ceec939efa91fa4435",
  };

  const mockHandler = vi.fn();

  const { container } = render(<Blog blog={blog} onPressLike={mockHandler} />);
  const user = userEvent.setup();
  const viewDetailBtn = container.querySelector(".viewBlog");
  await user.click(viewDetailBtn);

  const likeBtn = container.querySelector(".likeBlog");
  await user.click(likeBtn);
  await user.click(likeBtn);
  expect(mockHandler.mock.calls).toHaveLength(2);
});

test("<CreateBlogEntry /> updates parent state and calls onSubmit", async () => {
  const onCreateBlog = vi.fn();
  const user = userEvent.setup();

  render(<CreateBlogEntry onCreateNewBlog={onCreateBlog} />);

  const titleInput = screen.getByPlaceholderText("enter title");
  const authorInput = screen.getByPlaceholderText("enter author");
  const urlInput = screen.getByPlaceholderText("enter url");
  const submitButton = screen.getByText("create");

  await user.type(titleInput, "Canonical string reduction");
  await user.type(authorInput, "Edsger W. Dijkstra");
  await user.type(
    urlInput,
    "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html"
  );
  await user.click(submitButton);
  expect(onCreateBlog.mock.calls).toHaveLength(1);
  expect(onCreateBlog.mock.calls[0][0]).toBe("Canonical string reduction");
});
