import { useState, useEffect } from "react";

export default function Toolbar(props){
    let LocalStorageNotes = JSON.parse(localStorage.getItem("Notes"));

    function createNote(){
        LocalStorageNotes.unshift({"title":"", "text":"", "date": (props.getCurrentDate()).toString()});
        localStorage.setItem("Notes", JSON.stringify(LocalStorageNotes));
        props.setNotesList(LocalStorageNotes);
        props.setSelectedNote({id: 0, title: "", text: "", date: (props.getCurrentDate()).toString()})
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