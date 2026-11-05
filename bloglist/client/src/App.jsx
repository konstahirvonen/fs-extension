import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
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
import NewBlog from "./components/NewBlog";
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
import { useBlogActions, useBlogs, useUser, useUserActions } from "./store";
import Users from "./components/Users";

const App = () => {
  const blogs = useBlogs()
  const match = useMatch("/blogs/:id");
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;
  
  const { logoutUser } = useUserActions()
  const user = useUser()

  const { initialize } = useBlogActions()

  const [blogsLoaded, setBlogsLoaded] = useState(false)

  useEffect(() => {
    initialize().then(() => {
      setBlogsLoaded(true)
    })
  }, [initialize])

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

              <Button color="inherit" component={Link} to="/users">
                users
              </Button>

              {user && (
                <Button color="inherit" component={Link} to="/create">
                  new blog
                </Button>
              )}

              {user ? (
                <Button color="inherit" onClick={logoutUser}>
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

        <Box sx={{ mb: 2 }} />

        <Notification />
              
        {blogsLoaded && (
          <ErrorBoundary>
            <Routes>
              <Route
                path="/blogs/:id/"
                element={
                  <Blog
                    blog={blog}
                    user={user}
                  />
                }
              />

              <Route 
                path="/users"
                element={
                  <Users />
                }
              />

              <Route
                path="/users/:id"
                element={
                  <Users />
                }
              />

              <Route
                path="/"
                element={
                  <BlogForm user={user} />
                }
              />

              <Route
                path="/create"
                element={
                  user
                  ? <NewBlog user={user} />
                  : <LoginForm user={user} />
                }
              />

              <Route
                path="/login"
                element={<LoginForm user={user} />}
              />

              <Route path="*" element={<h1>404 - Page not found</h1>} />
              
            </Routes>
          </ErrorBoundary>
        )}
      </div>
    </Container>
  );
};

export default App;
