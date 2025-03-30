import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetNotification } from "../reducers/notificationReducer";
import { useRef } from "react";

const Notification = () => {
  const timerRef = useRef(null);
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    if (notification) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        dispatch(resetNotification());
      }, 3 * 1000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [notification]);

  const style = {
    border: "solid",
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
  };
  if (!notification) {
    return null;
  }
  return <div style={style}>{notification}</div>;
};

export default Notification;
