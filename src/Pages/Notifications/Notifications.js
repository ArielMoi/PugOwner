// import axios from "axios";
import { useEffect } from "react";
import NotificationWindow from "../../Components/NotificationWindow/NotificationWindow.Component";
import "./Notifications.css";

function Notifications() {
  useEffect(() => {

  });

  return (
    <div className="notifications">
      <h1>Notifications Board</h1>
      <button>
        <i className="far fa-plus-square fa-2x"></i>
      </button>
      <NotificationWindow
        date="18.10.20"
        time="18:20"
        message="this will be a notification"
      />
      <NotificationWindow
        date="18.10.20"
        time="18:20"
        message="this will be a notification"
      />
      <NotificationWindow
        date="18.10.20"
        time="18:20"
        message="this will be a notification"
      />
      <NotificationWindow
        date="18.10.20"
        time="18:20"
        message="this will be a notification"
      />
    </div>
  );
}

export default Notifications;
