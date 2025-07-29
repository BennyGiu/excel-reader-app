import Body from "./components/Body";
import NavBar from "./components/NavBar";
import { useState } from "react";
import "./App.css";

function App() {
  const [fileCaricato, setfileCaricato] = useState("no");
  const [fileName, setFileName] = useState("");
  const [testo, setTesto] = useState("");

  const handleFileChange = (event) => {
    if (event.target.files) {
      setFileName(event.target.files[0].name);
      event.target.files[0].text().then((text) => setTesto(text));
      //setTesto(file.text().then((text) => text));
    }
  };

  return (
    <div className="d-flex flex-column vh-100">
      <NavBar
        onClick={() => {
          setfileCaricato("caricando");
        }}
      ></NavBar>
      <Body
        fileCaricato={fileCaricato}
        handleFileChange={handleFileChange}
        onUpload={() => {
          setfileCaricato("caricato");
        }}
        testo={testo}
        fileName={fileName}
      ></Body>
    </div>
  );
}

export default App;
