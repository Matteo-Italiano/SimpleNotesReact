import { useEffect, useState } from 'react'
import { getDocs, addDoc, collection, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from './config/firebase.js'
import Sidebar from './Sidebar'
import Maincontent from './Maincontent'
import './App.css'

function App() {
  const [notesList, setNotesList] = useState([])
  const [selectedNote, setSelectedNote] = useState({})

  const notesCollectionRef = collection(db, "Notes");
  const noteRef = doc(notesCollectionRef, `${selectedNote.id}`)

  let currentIndexNote = (indexNote) => {
    let index = notesList.findIndex((index) => index.id === indexNote.id);
    return index;
  }

  let selectedNoteIndex = currentIndexNote(selectedNote)

  useEffect(() => {
    const getData = async () => {
      try {
        let data = await getDocs(collection(db, "Notes"))
        let notes = []

        data.docs.forEach(snapshot => {
          let note = snapshot.data()
          note.id = snapshot.id

          if (
            (typeof note.text === 'string' || typeof note.text === 'number') &&
            (typeof note.title === 'string' || typeof note.title === 'number') &&
            (typeof note.date === 'string')
          ) {
            notes.push(note);
          }
        });

        notes.forEach((note) => {
          if (note.text.trim() === "" && note.title.trim() === "") {
            deleteNoteFromFirebase(note)
          }
        })

        notes = notes.filter(note => note.text.trim() !== "" || note.title.trim() !== "")

        setNotesList(notes)
      } catch (err) {
        console.warn(err)
      }
    }
    getData()
  }, [])

  const deleteNoteFromFirebase = async (deletingNote) => {
    await deleteDoc(doc(notesCollectionRef, deletingNote.id))
  }

  function deleteNote(deletingNote) {
    let deletingNoteIndex = currentIndexNote(deletingNote)

    if (deletingNoteIndex === -1) {
    } else {
      const newList = [...notesList]
      newList.splice(deletingNoteIndex, 1);

      setNotesList(newList);
      setSelectedNote({ id: undefined });

      deleteNoteFromFirebase(deletingNote)
    }
  }

  function saveNote() {
    let titleInput = document.getElementById("title-input").innerText;
    let textInput = document.getElementById("text-input").innerText;
    let newList = [...notesList]

    if (selectedNote.id) {
      newList[selectedNoteIndex] = { title: titleInput, text: textInput, date: newList[selectedNoteIndex].date, id: newList[selectedNoteIndex].id };
      setNotesList(newList);

      const updateNote = async () => {
        try {
          await updateDoc(noteRef, { "title": titleInput, "text": textInput });
        } catch (err) {
          console.error(err);
        }
      };

      updateNote()
    }
  }

  useEffect(() => {
    if (!selectedNote.id) {
      document.getElementById("title-input").value = "";
      document.getElementById("text-input").value = "";
    } else {
      document.getElementById("title-input").innerText = selectedNote.title;
      document.getElementById("text-input").innerText = selectedNote.text;
      document.getElementById("display-date").innerText = selectedNote.date;
    }
  }, [selectedNote]);

  function createNote() {
      const emptyNote = notesList.find(note => note.title.trim() === "" && note.text.trim() === "");

      if (emptyNote) {
          setSelectedNote(emptyNote);
          return;
      }
      
      const date = getCurrentDate().toString();
      let placeholderObject = {
        title: "",
        text: "",
        date: date,
      };

      const onCreate = async () => {
        try {
          let id = (await addDoc(notesCollectionRef, placeholderObject)).id;
          let objectWithId = { ...placeholderObject, id: id }

          setNotesList([objectWithId, ...notesList])
          setSelectedNote(objectWithId);
        } catch (err) {
          console.error(err);
        }
      };

      onCreate();
  }

  function filter(e) {
    const filteredNotes = notesList.map((note) => ({
      ...note, status: !(note.title.toLowerCase().includes((e.target.value).toLowerCase()) || note.text.toLowerCase().includes((e.target.value).toLowerCase())),
    }));
    setNotesList(filteredNotes);
  }

  function getCurrentDate() {
    let date = new Date()
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"]
    let finalDate = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    return finalDate;
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

  return (
    <div className='all-content'>
      <Sidebar filter={filter} createNote={createNote} setSelectedNote={setSelectedNote} selectedNote={selectedNote} notesList={notesList} />
      <div className='vertical-line'>
        <img id='rotate' src="./Button 01.svg" alt="" onClick={() => toggleSidebar()} />
      </div>
      <Maincontent saveNote={saveNote} deleteNote={deleteNote} selectedNote={selectedNote} />
    </div>
  )
}

export default App
