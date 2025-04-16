import { useEffect, useState } from "react";
import {
  getDocs,
  getDoc,
  addDoc,
  collection,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./config/firebase.js";
import Sidebar from "./Sidebar";
import Maincontent from "./Maincontent";
import "./App.css";

function App() {
  const [notesList, setNotesList] = useState([]);
  const [selectedNote, setSelectedNote] = useState({});
  const [pinStatus, setPinStatus] = useState();

  const notesCollectionRef = collection(db, "Notes");
  const noteRef = doc(notesCollectionRef, `${selectedNote.id}`);

  let selectedNoteIndex = currentIndexNote(selectedNote);

  useEffect(() => {
    const getData = async () => {
      try {
        let data = await getDocs(collection(db, "Notes"));
        let notes = [];

        let index = 0;

        data.docs.forEach((snapshot) => {
          let note = snapshot.data();
          note.id = snapshot.id;
          note.index = index;
          index = index + 1;

          if (
            (typeof note.text === "string" || typeof note.text === "number") &&
            (typeof note.title === "string" ||typeof note.title === "number")) {
            notes.push(note);
          }
        });

        notes.forEach((note) => {
          if (note.text.trim() === "" && note.title.trim() === "") {
            deleteNoteFromFirebase(note);
          }

          note.date = new Date(note.date.seconds * 1000)
        });

        notes = notes.filter(
          (note) => note.text.trim() !== "" || note.title.trim() !== ""
        );

        notes.sort((a, b) => (b.pinned === a.pinned ? 0 : b.pinned ? 1 : -1));

        
        setNotesList(notes);
      } catch (err) {
        console.warn(err);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (!selectedNote.id) {
      document.getElementById("title-input").value = "";
      document.getElementById("text-input").value = "";
    } else {
      document.getElementById("title-input").innerText = selectedNote.title;
      document.getElementById("text-input").innerText = selectedNote.text;
      document.getElementById("display-date").innerText = formatDateToString(selectedNote.date)

    setPinStatus(selectedNote.pinned);
    }
  }, [selectedNote]);


  const deleteNoteFromFirebase = async (deletingNote) => {
    await deleteDoc(doc(notesCollectionRef, deletingNote.id));
  };

  function deleteNote(deletingNote) {
    let deletingNoteIndex = currentIndexNote(deletingNote);

    if (deletingNoteIndex === -1) {
    } else {
      const newList = [...notesList];
      newList.splice(deletingNoteIndex, 1);

      setNotesList(newList);
      setSelectedNote({ id: undefined });

      deleteNoteFromFirebase(deletingNote);
    }
  }

  function saveNote() {
    let titleInput = document.getElementById("title-input").innerText;
    let textInput = document.getElementById("text-input").innerText;
    let newList = [...notesList];

    if (selectedNote.id) {
      newList[selectedNoteIndex] = {
        title: titleInput,
        text: textInput,
        date: newList[selectedNoteIndex].date,
        id: newList[selectedNoteIndex].id,
      };
      setNotesList(newList);

      const updateNote = async () => {
        try {
          await updateDoc(noteRef, { title: titleInput, text: textInput });
        } catch (err) {
          console.error(err);
        }
      };

      updateNote();
    }
  }

  function createNote() {
    const emptyNote = notesList.find(
      (note) => note.title.trim() === "" && note.text.trim() === ""
    );

    if (emptyNote) {
      setSelectedNote(emptyNote);
      return;
    }

    const date = new Date()
    let placeholderObject = {
      title: "",
      text: "",
      date: date,
      pinned: false,
    };

    const onCreate = async () => {
      try {
        let id = (await addDoc(notesCollectionRef, placeholderObject)).id;
        let objectWithId = { ...placeholderObject, id: id };

        setNotesList([objectWithId, ...notesList]);
        setSelectedNote(objectWithId);
      } catch (err) {
        console.error(err);
      }
    };

    onCreate();
  }

  function filterNotes(e) {
    const filteredNotes = notesList.map((note) => ({
      ...note,
      status: !(
        note.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        note.text.toLowerCase().includes(e.target.value.toLowerCase())
      ),
    }));
    setNotesList(filteredNotes);
  }

  function getCurrentDate(rawDate) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Okt",
      "Nov",
      "Dez",
    ];

    if (rawDate == undefined){
      let date = new Date();
      
      return(date);
    } else {
      if (rawDate.seconds){
        let date = new Date((rawDate.seconds * 1000) + (rawDate.nanoseconds / 1000000))
        let finalDate = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

        return(finalDate)
      } else {
        let finalDate = `${months[rawDate.getMonth()]} ${rawDate.getDate()}, ${rawDate.getFullYear()}`;

        return(finalDate)
      }
    }
  }

  const formatDateToString = (dateObject) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Okt",
      "Nov",
      "Dez",
    ];

    let finalDate = `${months[dateObject.getMonth()]} ${dateObject.getDate()}, ${dateObject.getFullYear()}`;
    return(finalDate)
  }



  function handlePinChange(note) {
    const newList = notesList.map((n) => {
      if (n.id === note.id) {
        const updatedNote = { ...n, pinned: !n.pinned };

        const ref = doc(notesCollectionRef, n.id);
        updateDoc(ref, { pinned: updatedNote.pinned });

        return updatedNote;
      }
      return n;
    });

    newList.sort((a, b) => (b.pinned === a.pinned ? 0 : b.pinned ? 1 : -1));

    setNotesList(newList);
    setPinStatus(!pinStatus);
  }

  var animationState = "Closed";
  function toggleSidebar() {
    var sidebar = document.getElementById("side-bar");
    var image = document.getElementById("rotate");

    sidebar.classList.remove("shrink", "grow");
    image.classList.remove("rotate", "rotate2");

    if (animationState === "Closed") {
      sidebar.classList.add("shrink");
      image.classList.add("rotate");
      animationState = "Open";
    } else {
      sidebar.classList.add("grow");
      image.classList.add("rotate2");
      animationState = "Closed";
    }
  }

  function currentIndexNote (indexNote) {
    let index = notesList.findIndex((index) => index.id === indexNote.id);
    return index;
  };


  return (
    <div className="all-content">
      <Sidebar
        filter={filterNotes}
        createNote={createNote}
        setSelectedNote={setSelectedNote}
        selectedNote={selectedNote}
        notesList={notesList}
        getCurrentDate={getCurrentDate}
        formatDateToString={formatDateToString}
      />
      <div className="vertical-line">
        <img
          id="rotate"
          src="./Button 01.svg"
          alt=""
          onClick={() => toggleSidebar()}
        />
      </div>
      <Maincontent
        pinStatus={pinStatus}
        handlePinChange={handlePinChange}
        saveNote={saveNote}
        deleteNote={deleteNote}
        selectedNoteIndex={selectedNoteIndex}
        notesList={notesList}
        selectedNote={selectedNote}
      />
    </div>
  );
}

export default App;
