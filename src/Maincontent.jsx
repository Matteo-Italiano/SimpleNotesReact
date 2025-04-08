
export default function Maincontent(props) {

    return (
        <div className="main-content">
            <img
                src="/bin1.svg"
                alt="Delete"
                onClick={() => props.deleteNote()}
            />
            <div className="A4-Blatt">
                <h1
                    contentEditable={!(props.selectedNote.id == undefined)}
                    placeholder="Enter a title"
                    type="text"
                    id="title-input"
                    onInput={() => props.SaveNote()}
                ></h1>
                <p id="display-date"></p>
                <p
                    contentEditable={!(props.selectedNote.id == undefined)}
                    placeholder="Enter a text"
                    type="text"
                    id="text-input"
                    onInput={() => props.SaveNote()}
                />{" "}
                <br />
                <br />
            </div>
        </div>
    );
}
