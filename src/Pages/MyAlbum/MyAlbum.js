import axios from "axios";
import { useEffect, useState } from "react";
// import { useEffect } from "react";
import AlbumNote from "../../Components/AlbumNote/AlbumNote.Component";
import EditAlbumNoteWindow from "../../Components/EditAlbumNoteWindow/EditAlbumNoteWindow.Component";
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
  const updateAlbumInApi = async () => { // ! doesn't update correctly the api - BUG
    try {
      let { data } = await axios.patch(`${API}${localStorage.getItem("id")}`, {
        // album,
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
    updateAlbumInApi(); //!
  };

  // edit functions
  const [editVisibility, setEditVisibility] = useState("hidden");
  const [currentNote, setCurrentNote] = useState('')
  const [beforeEditNote, setBeforeEditNote] = useState('')

  const editFromAlbum = async (note) => {
    setCurrentNote(note);
    setBeforeEditNote(note); // keeping refrence to the unchanged not
    setEditVisibility("visible");
  };

  const editTextAlbumNote = (editedNote) => {
    setCurrentNote(editedNote);
  }

  const submitEdit = () => {
    // iterating over the obj to keep the order
    let updatedAlbum = {}
    Object.entries(album).forEach(([note, pugIndex]) => {
      note === beforeEditNote
        ? (updatedAlbum[currentNote] = pugIndex)
        : (updatedAlbum[note] = pugIndex);
    })

    // console.log(updatedAlbum);
    setAlbum(updatedAlbum);
    setEditVisibility("hidden");
    updateAlbumInApi(); // !
  }

  let key = 0;
  return (
    <div className="Album">
      <EditAlbumNoteWindow
        input={
          <textarea
            value={currentNote}
            rows="4"
            cols="50"
            onChange={(e) => editTextAlbumNote(e.target.value)}
          />
        }
        visibility={editVisibility}
        onClickExit={() => setEditVisibility("hidden")}
        onClickSubmit={submitEdit}
      />
      <h1>My Album Board</h1>
      <div className="album-grid">
        {Object.entries(album).map(([note, PugIndex]) => (
          <AlbumNote
            key={key++}
            message={note}
            pugNum={PugIndex}
            deleteClick={() => deleteFromAlbum(note)}
            editClick={() => editFromAlbum(note)}
          />
        ))}
      </div>
    </div>
  );
}

export default Album;
