import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

axios.interceptors.request.use(
  (config) => {
    return {
      ...config,
      headers: { Authorization: token },
    };
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getAll = async () => {
  const request = axios.get(baseUrl);
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    return {
      error:
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong. Please try later",
    };
  }
};

export const addBlog = async (blog) => {
  const request = axios.post(baseUrl, blog);
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    return {
      error:
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong. Please try later",
    };
  }
};

export const updateBlog = async (id, blog) => {
  const request = axios.put(`${baseUrl}/${id}`, blog);
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    return {
      error:
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong. Please try later",
    };
  }
};

export const deleteBlog = async (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    return {
      error:
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong. Please try later",
    };
  }
};

export default { getAll, addBlog, setToken, updateBlog, deleteBlog };
