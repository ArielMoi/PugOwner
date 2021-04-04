import axios from "axios";
// import { useEffect } from "react";
import AlbumNote from "../../Components/AlbumNote/AlbumNote.Component";
import "./MyAlbum.css";

function Album(props) {
  return (
    <div className="Album">
      <h1>My Album Board</h1>
      <div className="album-grid">
        {/* iterate over props.album to extract all notes. should  */}
        <AlbumNote
          date="18.10.20"
          time="18:20"
          message="this will be a notification"
          pugNum="3"
        />
        <AlbumNote
          date="18.10.20"
          time="18:20"
          message="this will be a notification"
          pugNum="5"
        />
        <AlbumNote
          date="18.10.20"
          time="18:20"
          message="this will be a notification"
          pugNum="7"
        />
        <AlbumNote
          date="18.10.20"
          time="18:20"
          message="this will be a notification"
        />
      </div>
    </div>
  );
}

export default Album;
