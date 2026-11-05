import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Button, Box, TextField } from "@mui/material";
import { useBlogActions } from "../store";
import { useState } from "react";

const Blog = ({
  blog,
  user,
}) => {
  const id = useParams().id;
  const navigate = useNavigate();
  const { like, remove } = useBlogActions()
  const [comment, setComment] = useState("")
  const { commentBlog } = useBlogActions()

  if (!blog) {
    throw new Error("Blog not found")
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

  const addComment = async (e) => {
    e.preventDefault()

    await commentBlog(blog.id, comment)

    setComment("")
  }

  return (
    <div data-testid="blog">
      <Card sx={{ mb: 2, maxWidth: 600 }}>
        <CardContent>
          <Typography variant="h4" sx={{ paddingBottom: 2 }}>{blog.title}</Typography>

          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            by {blog.author}
          </Typography>

          <Typography variant="body2" sx={{ mb: 1 }}>
            <Link href={blog.url}>{blog.url}</Link>
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ paddingBottom: 2 }}>
            Added by: {blog.user.name}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
            <Typography>{blog.likes} Likes</Typography>

            {user && (
              <Button variant="outlined" size="small" onClick={handleLike}>
                Like
              </Button>
            )}
          </Box>

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

          <Typography variant="h6">Comments</Typography>
          <form onSubmit={addComment}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <TextField
                size="small"
                label="add a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button type="submit" variant="contained" style={{ marginLeft: 10, height: 40 }}>add comment</Button>
            </div>
          </form>

          {blog.comments.length > 0 && (
            <ul data-testid="comments">
              {blog.comments.map((comment, index) => (
                <li key={index} data-testid="comment">
                  {comment}
                </li>
              ))}
            </ul>
          )}

        </CardContent>
      </Card>
    </div>
  );
};

export default Blog;
