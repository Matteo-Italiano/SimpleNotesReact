
import { use, useEffect, useState } from 'react'
import { getDocs, getDoc, collection } from 'firebase/firestore'
import { db } from './config/firebase.js'
import Toolbar from "./Toolbar";
import Note from "./Note";

export default function Sidebar(props) {

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

                props.setNotesList(notes);
            } catch (err) {
                console.warn(err)
            }
        }
        getData()
    }, []);

    return (
        <div id="side-bar" className="side-bar">
            <Toolbar setShowingNotes={props.setShowingNotes} setNotesList={props.setNotesList} notesList={props.notesList} getCurrentDate={props.getCurrentDate} setSelectedNote={props.setSelectedNote} selectedNote={props.selectedNote} />
            <div className="notes">
                {props.notesList.map((note, index) => (
                    <Note date={props.notesList[index].date} key={index} index={index} id={props.notesList[index].id} title={note.title} text={note.text} setSelectedNote={props.setSelectedNote} selectedNote={props.selectedNote} status={note.status} />
                ))
                }
            </div>
        </div>
    );
}