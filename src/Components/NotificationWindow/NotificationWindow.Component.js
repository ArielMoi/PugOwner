import "./NotificationWindow.css";

function NotificationWindow(props) {
  return (
    <div className="notification-window">
      <p>
        {props.date} , {props.time}
      </p>
      <h3>{props.message}</h3>
      <div className="btns">
        <button>
          <i className="far fa-edit"></i>
        </button>
        <button>
          <i className="far fa-trash-alt"></i>
        </button>
      </div>
    </div>
  );
}

export default NotificationWindow;
