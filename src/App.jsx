import { useState } from 'react'
import Sidebar from './Sidebar'
import Maincontent from './Maincontent'

function App() {

  const [notesList, setNoteList] = useState([])

  const [selectedNote, setSelectedNote] = useState([])

  return (
    <>
    <Sidebar selectedNote={selectedNote} setSelectedNote={setSelectedNote} notesList={notesList} setNoteList={setNoteList} />
    <Maincontent selectedNote={selectedNote} setSelectedNote={setSelectedNote} notesList={notesList} setNoteList={setNoteList} />
    </>
  )
}

export default App
