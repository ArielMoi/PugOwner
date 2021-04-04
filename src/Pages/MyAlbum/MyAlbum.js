// import axios from "axios";
import { useEffect } from "react";
import AlbumNote from "../../Components/AlbumNote/AlbumNote.Component";
import "./MyAlbum.css";
import CreatePugPic from '../../Components/CreatePugPic/CreatePugPic.Component'

function Album() {
  return (
    <div className="Album">
      <CreatePugPic />
      <h1>My Album Board</h1>
      <div className='album-grid'>
        <AlbumNote
          date="18.10.20"
          time="18:20"
          message="this will be a notification"
        />
        <AlbumNote
          date="18.10.20"
          time="18:20"
          message="this will be a notification"
        />
        <AlbumNote
          date="18.10.20"
          time="18:20"
          message="this will be a notification"
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
