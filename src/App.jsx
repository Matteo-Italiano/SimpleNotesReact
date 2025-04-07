import { use, useEffect, useState } from 'react'
import { getDocs, getDoc, collection } from 'firebase/firestore'
import { db } from './config/firebase.js'
import Sidebar from './Sidebar'
import Maincontent from './Maincontent'
import './App.css'

function App() {

  const getData = async () => {
    try {

      let data = await getDocs(collection(db, "Notes"))
      let notes = []

      data.docs.forEach(Snapshot => {
        let note = Snapshot.data()
        note.id = Snapshot.id
        notes.push(note)
      });
      
    } catch (err) {
      console.warn(err)
    }
  }
  getData()


  const [notesList, setNotesList] = useState([])
  const [selectedNote, setSelectedNote] = useState({})
  const [showingNotes, setShowingNotes] = useState()


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
      <Sidebar showingNotes={showingNotes} setShowingNotes={setShowingNotes} getCurrentDate={getCurrentDate} selectedNote={selectedNote} setSelectedNote={setSelectedNote} notesList={notesList} setNotesList={setNotesList} />
      <div className='vertical-line'>
        <img id='rotate' src="/Button 01.svg" alt="" onClick={() => toggleSidebar()} />
      </div>
      <Maincontent getCurrentDate={getCurrentDate} selectedNote={selectedNote} setSelectedNote={setSelectedNote} notesList={notesList} setNotesList={setNotesList} />
    </div>
  )
}

export default App
