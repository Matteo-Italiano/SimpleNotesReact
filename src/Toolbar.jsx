export default function Toolbar(props) {



    return (
        <div className="tool-bar">
            <img src="./Logo.svg" alt="Profile-Pic" />
            <div className="search-div">
                <img src="./Frame.svg" alt="Search" id="search-btn" />
                <input
                    type="text"
                    id="search-bar"
                    placeholder="Search"
                    onChange={(e) => props.filterNotes(e)}
                />
            </div>
            <img src="./n-edit 1.svg" alt="Create Note" onClick={() => props.createNote()} />
        </div>
    );
}