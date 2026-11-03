import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { useBlogActions } from "../store";

const Blog = ({
  blog,
  user,
}) => {
  const id = useParams().id;
  const navigate = useNavigate();
  const { like, remove } = useBlogActions()

  if (!blog) {
    return <h1>404 - Page not found</h1>;
  }

  const handleLike = async (e) => {
    e.preventDefault();

    if (!user) {
      return null;
    }

    like(blog.id)
  };

  const removeBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      remove(blog.id)
      navigate("/");
    }
  };

  return (
    <div data-testid="blog">
      <Card sx={{ mb: 2, maxWidth: 600 }}>
        <CardContent>
          <Typography variant="h6">{blog.title}</Typography>

          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            by {blog.author}
          </Typography>

          <Typography variant="body2" sx={{ mb: 1 }}>
            <Link href={blog.url}>{blog.url}</Link>
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
            <Typography>Likes: {blog.likes}</Typography>

            {user && (
              <Button variant="outlined" size="small" onClick={handleLike}>
                Like
              </Button>
            )}
          </Box>

          <Typography variant="body2" color="text.secondary">
            Added by: {blog.user ? blog.user.name : ""}
          </Typography>

          {user && blog.user && user.username === blog.user.username && (
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={removeBlog}
              sx={{ mt: 2 }}
            >
              Delete
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Blog;
