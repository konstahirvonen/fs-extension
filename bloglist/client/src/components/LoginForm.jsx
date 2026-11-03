import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { TextField, Button } from "@mui/material";
import { useNotificationActions, useUserActions } from "../store";

const LoginForm = ({ user }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setNotification } = useNotificationActions()
  const { loginUser, initialize } = useUserActions()

  useEffect(() => {
    initialize()
  }, [initialize]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      loginUser(username, password)

      setUsername("");
      setPassword("");
      navigate("/");
    } catch {
      setNotification("wrong credentials", "error")
    }
  };

  return (
    <div>

      <form onSubmit={handleLogin}>
        <h2>Login to application</h2>
        <div>
          <TextField
            label="username"
            variant="standard"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <TextField
            label="password"
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
          login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
