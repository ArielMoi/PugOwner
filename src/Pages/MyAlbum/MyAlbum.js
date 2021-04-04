import axios from "axios";
import { useEffect, useState } from "react";
// import { useEffect } from "react";
import AlbumNote from "../../Components/AlbumNote/AlbumNote.Component";
import EditAlbumNoteWindow from '../../Components/EditAlbumNoteWindow/EditAlbumNoteWindow.Component'
import "./MyAlbum.css";

const API = `https://605b251627f0050017c0645f.mockapi.io/users/`;

function Album() {
  const [album, setAlbum] = useState({});

  useEffect(() => {
    // collecting initializing data for the album
    const collectAlbum = async () => {
      let { data } = await axios.get(`${API}${localStorage.getItem("id")}`);
      setAlbum(data.album);
    };

    collectAlbum();
  }, []);

  // update album in api func
  const updateAlbumInApi = async () => {
    try {
      let { data } = await axios.put(`${API}${localStorage.getItem("id")}`, {
        album: { ...album },
      });

      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  // delete func
  const deleteFromAlbum = async (mes) => {
    let updatedAlbum = { ...album };
    await delete updatedAlbum[mes];
    await setAlbum(updatedAlbum);
    console.log(updatedAlbum); // *
    console.log(album); // ! album not updating to updated album
    updateAlbumInApi();
  };


  // edit func

  let key = 0;
  return (
    <div className="Album">
      < EditAlbumNoteWindow />
      <h1>My Album Board</h1>
      <div className="album-grid">
        {/* iterate over album to extract all notes. */}
        {Object.entries(album).map(([note,PugIndex]) => (
          <AlbumNote
            key={key++}
            message={note}
            pugNum={PugIndex}
            deleteClick={() => deleteFromAlbum(note)}
          />
        ))}
      </div>
    </div>
  );
}

export default Album;
