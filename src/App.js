import Body from "./components/Body";
import NavBar from "./components/NavBar";
import { useState } from "react";
import "./App.css";

function App() {
  const [fileCaricato, setfileCaricato] = useState("no");
  const [fileName, setFileName] = useState("");
  const [testo, setTesto] = useState("");
  const [giorno, setGiorno] = useState("");

  const handleFileChange = (event) => {
    if (event.target.files) {
      setFileName(event.target.files[0].name);
      event.target.files[0].text().then((text) => setTesto(text));
      //setTesto(file.text().then((text) => text));
    }
  };

  const handleSetGiorno = (giornoDaMostrare) => {
    setfileCaricato("giorno");
    setGiorno(giornoDaMostrare);
  };

  return (
    <div className="d-flex flex-column h-100">
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
        handleSetGiorno={handleSetGiorno}
        giorno={giorno}
      ></Body>
    </div>
  );
}

export default App;
