import { use, useEffect, useState } from 'react'
import { getDocs, getDoc, addDoc, collection, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from './config/firebase.js'
import Sidebar from './Sidebar'
import Maincontent from './Maincontent'
import './App.css'

function App() {
  const [notesList, setNotesList] = useState([])
  const [selectedNote, setSelectedNote] = useState({})
  const [showingNotes, setShowingNotes] = useState()

  const NoteRef = doc(db, "Notes", `${selectedNote.id}`)
  const NotesCollectionRef = collection(db, "Notes");
  let selectedNoteIndex = notesList.findIndex((Note) => Note.id === selectedNote.id);


  // Get the Data from Firestore
useEffect(() => {
  const getData = async () => {
    try {
      let data = await getDocs(collection(db, "Notes"))
      let notes = []

      data.docs.forEach(Snapshot => {
        let note = Snapshot.data()
        note.id = Snapshot.id
        notes.push(note)
      });

      setNotesList(notes)
    } catch (err) {
      console.warn(err)
    }
  }

  getData()
},[])


  // Save the Note
  function SaveNote() {
    let titleInput = document.getElementById("title-input").innerText;
    let textInput = document.getElementById("text-input").innerText;

    let newList = [...notesList]

    if (selectedNote.id) {
        newList[selectedNoteIndex] = {title: titleInput, text: textInput, date: newList[selectedNoteIndex].date, id: newList[selectedNoteIndex].id};
        setNotesList(newList);

        const updateNote = async () => {
            try {
                await updateDoc(NoteRef, {"title": titleInput, "text": textInput});
            } catch (err) {
                console.error(err);
            }
        };

        updateNote()
    }
}

  //  Delete selected Note
  function deleteNote() {
    if (!selectedNote.id) {
    } else {

      const newList = [...notesList]
        newList.splice(selectedNoteIndex, 1);

        setNotesList(newList);
        setSelectedNote({ id: undefined });

        const deleteNoteFromFirebase = async () =>{
            await deleteDoc(NoteRef)
        }
        deleteNoteFromFirebase()
        
    }
}

  // Show the note on the Main-Content
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


  // Create a Note
  function createNote() {
    const date = getCurrentDate().toString();

    let placeholderObject = {
        title: "",
        text: "",
        date: date,
    };

    const onCreate = async () => {
        try {
            let id = (await addDoc(NotesCollectionRef, placeholderObject)).id;
            let ObjectWithId = { ...placeholderObject, id: id }

            setNotesList([ObjectWithId, ...notesList])
            setSelectedNote(ObjectWithId);
        } catch (err) {
            console.error(err);
        }
    };

    onCreate();
}

  // The Filter for the Searchbar
  function filter(e) {
    const filteredNotes = notesList.map((note) => ({...note, status: !(note.title.includes(e.target.value) || note.text.includes(e.target.value)),
    }));

    setNotesList(filteredNotes);
}

  function getCurrentDate() {
    let date = new Date
    const Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"]
    let finalDate = `${Months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    return (finalDate)
  }

  var AnimationState = "Closed";
  function toggleSidebar() {
    var sidebar = document.getElementById("side-bar");
    var image = document.getElementById("rotate");

    sidebar.classList.remove("shrink", "grow");
    image.classList.remove("rotate", "rotate2");

    if (AnimationState === "Closed") {
      sidebar.classList.add("shrink");
      image.classList.add("rotate");
      AnimationState = "Open";
    } else {
      sidebar.classList.add("grow");
      image.classList.add("rotate2");
      AnimationState = "Closed";
    }
  }

  return (
    <div className='all-content'>
      <Sidebar filter={filter} createNote={createNote} setSelectedNote={setSelectedNote} selectedNote={selectedNote} notesList={notesList}/>
      <div className='vertical-line'>
        <img id='rotate' src="/Button 01.svg" alt="" onClick={() => toggleSidebar()} />
      </div>
      <Maincontent SaveNote={SaveNote} deleteNote={deleteNote} selectedNote={selectedNote}/>
    </div>
  )
}

export default App
