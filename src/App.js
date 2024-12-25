import "./styles.css";
import { useState } from "react";
import explorer from "./Data/folderData";
import Folde from "./Components/Folde";
import useTranversalHook from "./Hooks/useTraversalHook";

export default function App() {
  const [explorerData, setExplorerData] = useState(explorer);
  const { insertNode } = useTranversalHook();

  const handelInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);

    setExplorerData(finalTree);
  };
  return (
    <div className="App">
      <Folde handelInsertNode={handelInsertNode} explorer={explorerData} />
    </div>
  );
}
