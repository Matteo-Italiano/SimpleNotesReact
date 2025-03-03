import { useState, useEffect } from "react";
import Toolbar from "./Toolbar";
import Note from "./Note";

export default function Sidebar(props){

    function deleteNote(id){
        let arrayToSplice = JSON.parse(localStorage.getItem("Notes"))
        arrayToSplice.splice(id, 1)
        localStorage.setItem("Notes", JSON.stringify(arrayToSplice))
        props.setNoteList(() => arrayToSplice)
    }

    useEffect(() => {
        const storedNotes = JSON.parse(localStorage.getItem("Notes"))
        props.setNoteList(storedNotes)
    }, [])





    return(
        <>
        <Toolbar />
        {props.notesList.map((note, index) => <Note deleteNote={deleteNote} id={index} key={index} title={note.title} text={note.text}></Note>)} {/*Loadnotes Fuction*/}
        </>
    )
}