import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import LoginForm from "./components/Loginform";
import BlogForm from "./components/BlogForm";
import Blog from "./components/Blog";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useMatch,
  Navigate,
} from "react-router-dom";
import NewBlogForm from "./components/NewBlog";
import Notification from "./components/Notification";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import ErrorBoundary from "./components/ErrorBoundary";
import TestError from "./components/TestError";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const match = useMatch("/blogs/:id");
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogappUser");
  };

  return (
    <Container>
      <div>
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="h4">Blog app</Typography>

            <Box>
              <Button color="inherit" component={Link} to="/">
                blogs
              </Button>

              {user && (
                <Button color="inherit" component={Link} to="/create">
                  new blog
                </Button>
              )}

              {user ? (
                <Button color="inherit" onClick={handleLogout}>
                  logout
                </Button>
              ) : (
                <Button color="inherit" component={Link} to="/login">
                  login
                </Button>
              )}
            </Box>
          </Toolbar>
        </AppBar>

        <Notification />

        <ErrorBoundary>
          <Routes>
            <Route
              path="/blogs/:id/"
              element={
                <Blog
                  blog={blog}
                  blogs={blogs}
                  setBlogs={setBlogs}
                  user={user}
                />
              }
            />

            <Route
              path="/"
              element={
                <BlogForm blogs={blogs} setBlogs={setBlogs} user={user} />
              }
            />

            <Route
              path="/create"
              element={
                <NewBlogForm
                  user={user}
                  blogs={blogs}
                  setBlogs={setBlogs}
                />
              }
            />

            <Route
              path="/login"
              element={<LoginForm user={user} setUser={setUser} />}
            />

            <Route path="*" element={<h1>404 - Page not found</h1>} />
          </Routes>
        </ErrorBoundary>
      </div>
    </Container>
  );
};

export default App;
