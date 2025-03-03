import { useState } from "react";

export default function Toolbar(){

    function createNote(){
        JSON.parse(localStorage.getItem("Notes"))

        
    }

    return(
        <>
        <img src="./" alt="Profile-Pic"/>
        <input type="text" id="search-bar"/>
        <button onClick={createNote}>New Note</button>
        </>
    )
    
}