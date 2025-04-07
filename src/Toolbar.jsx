import { useState, useEffect } from "react";
import { db } from "./config/firebase.js"
import { getDocs, getDoc, collection, addDoc } from "firebase/firestore"

export default function Toolbar(props){
    let LocalStorageNotes = JSON.parse(localStorage.getItem("Notes"));

    // Referenz zu Notes Collection
        const NotesCollectionRef = collection(db, "Notes")

    function createNote(){

        const onCreate = async () => {
            try{
                let id = (await addDoc(NotesCollectionRef, {"title":"", "text":"", "date": (props.getCurrentDate()).toString()})).id
                LocalStorageNotes.unshift({"title":"", "text":"", "date": (props.getCurrentDate()).toString(), "id": id});

                localStorage.setItem("Notes", JSON.stringify(LocalStorageNotes));
                props.setNotesList(LocalStorageNotes);
                props.setSelectedNote({ title: "", text: "", date: (props.getCurrentDate()).toString(), id: id})
            } catch(err){
                console.error(err)
            } 
        }

        onCreate()
    }

    function filter(e) {
        const filteredNotes = props.notesList.map(note => ({ ...note, status: !(note.title.includes(e.target.value) || note.text.includes(e.target.value)) } ));
    
        props.setNotesList(filteredNotes);
    }
    



    return(
        <div className="tool-bar">
        <img src="/Logo.svg" alt="Profile-Pic"/>
        <div className="search-div">
            <img src="/Frame.svg" alt="Search" id="search-btn"/>
        <input type="text" id="search-bar" placeholder="Search" onChange={(e) => filter(e)}/>
        </div> 
        <img src="/n-edit 1.svg" alt="Create Note" onClick={() => createNote()}/>
        </div>
    )
    
}