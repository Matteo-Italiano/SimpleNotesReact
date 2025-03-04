import { useState, useEffect } from "react";

export default function Toolbar(props){

    function createNote(){
        let LocalStorageNotes = JSON.parse(localStorage.getItem("Notes"));
        LocalStorageNotes.push({"title":"", "text":""});
        localStorage.setItem("Notes", JSON.stringify(LocalStorageNotes));
        props.setNoteList(LocalStorageNotes);
    }
    

    return(
        <>
        <div>
        <img src="/Logo.svg" alt="Profile-Pic"/>
        <input type="text" id="search-bar"/>
        <button onClick={createNote}>New</button>
        </div>
        </>
    )
    
}