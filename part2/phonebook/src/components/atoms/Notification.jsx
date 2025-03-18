import { useEffect } from "react";
import { useState } from "react";

const styles = {
  successDiv: {
    border: "2px solid green",
    borderRadius: "4px",
    padding: "8px",
    margin: "8px 0",
    backgroundColor: "lightGrey",
    color: "green",
  },
  errorDiv: {
    border: "2px solid red",
    borderRadius: "4px",
    padding: "8px",
    margin: "8px 0",
    backgroundColor: "lightGrey",
    color: "red",
  },
};

const Notification = ({
  show = false,
  time = 2,
  message = "",
  onClearNotification = () => {},
  type = "success",
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timeout;
    if (!!show) {
      setVisible(true);
      timeout = setTimeout(() => {
        onClearNotification();
        setVisible(false);
      }, time * 1000);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [show]);

  if (!!visible) {
    return (
      <div style={type === "success" ? styles.successDiv : styles.errorDiv}>
        <strong>{message}</strong>
      </div>
    );
  }
};

export default Notification;
