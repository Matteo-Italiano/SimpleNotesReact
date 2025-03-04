import { useState } from "react";
import Sidebar from "./Sidebar";

export default function Maincontent(props){

    function SaveNote(){
        if (document.getElementById("title-input") !== "" && document.getElementById("text-input") !== ""){
            let newNote ={}

            newNote.title = document.getElementById("title-input").value
            newNote.text = document.getElementById("text-input").value

            props.setNoteList((n) => [...n, newNote])
            let newList = JSON.parse(localStorage.getItem("Notes"))
            newList.push(newNote)

            localStorage.setItem("Notes", JSON.stringify(newList))

            document.getElementById("title-input").value = ""
            document.getElementById("text-input").value = ""
        }
    }




    return(
        <>
        <h1>Title</h1>
        <input type="text" id="title-input" /> <br /> <br />
        <h2>Text</h2>
        <input type="text" id="text-input" /> <br /> <br />
        <button onClick={() => SaveNote()}>Save Note</button>
        </>
    )
}