import { Alert } from "@mui/material";
import { useNotification, useNotificationActions } from "../store";
import { useEffect } from "react";

const Notification = () => {

  const notification = useNotification()
  const { clearNotification } = useNotificationActions()

  useEffect(() => {
    if (!notification)
      return

    const timeout = setTimeout(() => {
      clearNotification()
    }, 5000)

    return () => clearTimeout(timeout)
  }, [notification, clearNotification])

  if (!notification) {
    return null
  }

  return (
    <Alert
      style={{ marginTop: 10, marginBottom: 10 }}
      className="message"
      severity={notification.type}
    >
      {notification.message}
    </Alert>
  );
};

export default Notification
