import "./AlbumNote.css";
import pugPic from '../../img/pug-eating.jpg'

function NotificationWindow(props) {
  return (
    <div className="album-window">
      <img src={pugPic} alt="pug" />
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
