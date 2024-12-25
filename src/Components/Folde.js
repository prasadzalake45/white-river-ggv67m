import { useState } from "react";
import "../styles.css";

function Folde({ handelInsertNode, explorer }) {
  const [expand, setExpand] = useState(false);

  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const handelNewInput = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);

    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const onAddFolder = (e) => {
    if (e.keyCode == 13 && e.target.value) {
      //add logic over here
      handelInsertNode(explorer.id, e.target.value, showInput.isFolder);

      setShowInput({ ...showInput, visible: false });
    }
  };
  if (explorer.isFolder) {
    return (
      <div>
        <div
          className="folder"
          // style={{ marginTop: 5, cursor: "pointer" }}
          onClick={() => {
            setExpand(!expand);
          }}
        >
          <span>📁{explorer.name}</span>
          <div>
            <button onClick={(e) => handelNewInput(e, true)}>Folder +</button>
            <button onClick={(e) => handelNewInput(e, false)}>File +</button>
          </div>
        </div>
        <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📁" : "📄"}</span>
              <input
                type="text"
                onKeyDown={onAddFolder}
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                className="inputContainer__inp"
                autoFocus
              />
            </div>
          )}
          {explorer.items.map((it) => {
            return (
              <Folde
                handelInsertNode={handelInsertNode}
                explorer={it}
                key={it.id}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return <span className="file">📄{explorer.name}</span>;
  }
}

export default Folde;
