import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { useBlogActions, useBlogs, useNotificationActions } from "../store";

const NewBlogForm = ({ user }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const { setNotification } = useNotificationActions()
  const { add } = useBlogActions()

  const addBlog = async (e) => {
    e.preventDefault()
    const content = ({
      title: title,
      author: author,
      url: url
    })
    await add(content)
    setNotification(`Blog "${content.title}" by "${content.author}" added"`, "success")

    setTitle("");
    setAuthor("");
    setUrl("");
    navigate("/");
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <h2>create new</h2>
        <div>
          <TextField
            label="title"
            style={{ marginTop: 10 }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <TextField
            label="author"
            style={{ marginTop: 10 }}
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <TextField
            label="url"
            style={{ marginTop: 10 }}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
          create
        </Button>
      </form>
    </div>
  );
};

export default NewBlogForm;
