import axios from "axios";
import { useEffect, useState } from "react";
// import { useEffect } from "react";
import AlbumNote from "../../Components/AlbumNote/AlbumNote.Component";
import EditAlbumNoteWindow from "../../Components/EditAlbumNoteWindow/EditAlbumNoteWindow.Component";
import "./MyAlbum.css";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage.Component";

const API = `https://605b251627f0050017c0645f.mockapi.io/users/`;

function Album() {
  const [album, setAlbum] = useState({});
  const [data, setData] = useState({});
  const [errorMessage, setErrorMessage] = useState("hidden");

  useEffect(() => {
    const collectStartData = async () => {
      try {
        let id = localStorage.getItem("id");
        let { data } = await axios.get(`${API}${id}`);

        setData(data);
        setAlbum(data.album);
      } catch (e) {
        console.log(e);
        setErrorMessage("visible");
      }
    };

    // collecting initializing data for the album
    const collectAlbum = async () => {
      try {
        let { data } = await axios.get(`${API}${localStorage.getItem("id")}`);
        setAlbum(data.album);
        setData(data);
      } catch (e) {
        console.log(e);
        collectStartData();
      }
    };

    collectAlbum();
  }, []);

  // update album in api func
  const updateAlbumInApi = async () => {
    try {
      await axios.put(`${API}${localStorage.getItem("id")}`, {
        album: { ...album },
        bag: data.bag,
      });
    } catch (e) {
      console.log(e);
    }
  };

  // delete func
  const deleteFromAlbum = (mes) => {
    let updatedAlbum = { ...album };
    delete updatedAlbum[mes];
    setAlbum(updatedAlbum);
  };

  // edit functions
  const [editVisibility, setEditVisibility] = useState("hidden");
  const [currentNote, setCurrentNote] = useState("");
  const [beforeEditNote, setBeforeEditNote] = useState("");
  const [currentPugEdited, setCurrentPugEdited] = useState(1);

  const editFromAlbum = async (note, pugIndex) => {
    setCurrentNote(note);
    setBeforeEditNote(note); // keeping reference to the unchanged not
    setEditVisibility("visible");
    setCurrentPugEdited(pugIndex);
  };

  const editTextAlbumNote = (editedNote) => {
    setCurrentNote(editedNote);
  };

  const submitEdit = () => {
    // iterating over the obj to keep the order
    let updatedAlbum = {};
    Object.entries(album).forEach(([note, pugIndex]) => {
      note === beforeEditNote
        ? (updatedAlbum[currentNote] = pugIndex)
        : (updatedAlbum[note] = pugIndex);
    });
    setAlbum(updatedAlbum);
    setEditVisibility("hidden");
  };

  useEffect(() => {
    updateAlbumInApi();
  }, [album]);

  let key = 0;
  return (
    <div className="Album">
      <ErrorMessage
        visibility={errorMessage}
        onClickExit={() => setErrorMessage("hidden")}
      />
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
        pugIndex={currentPugEdited}
      />
      <h1>My Album Board</h1>
      <div className="album-grid">
        {Object.entries(album).map(([note, pugIndex]) => (
          <AlbumNote
            key={key++}
            message={note}
            pugNum={pugIndex}
            deleteClick={() => deleteFromAlbum(note)}
            editClick={() => editFromAlbum(note, pugIndex)}
          />
        ))}
      </div>
    </div>
  );
}

export default Album;
