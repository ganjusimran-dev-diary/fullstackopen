import { useState, useEffect } from "react";

import { LoginPage, BlogsList } from "./pages";
import blogsService from "./services/blogs";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("currentUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogsService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const onLogout = () => {
    window.localStorage.clear();
    blogsService.setToken("");
    setUser(null);
  };

  if (user) {
    return <BlogsList onLogout={onLogout} user={user} />;
  } else {
    return <LoginPage setUser={setUser} />;
  }
};

export default App;
