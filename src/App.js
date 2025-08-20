import Body from "./components/Body";
import NavBar from "./components/NavBar";
import { useState } from "react";
import "./App.css";

function App() {
  const [fileCaricato, setfileCaricato] = useState("no");
  const [fileName, setFileName] = useState("");
  const [testo, setTesto] = useState("");
  const [giorno, setGiorno] = useState("");
  const [valori, setValori] = useState({});
  const [labels, setLabels] = useState([]);
  const [datiGiorno, setDatiGiorno] = useState("");
  const [disableLeft, setDisableLeft] = useState(false);
  const [disableRight, setDisableRight] = useState(false);

  const handleFileChange = (event) => {
    if (event.target.files) {
      setFileName(event.target.files[0].name);
      event.target.files[0].text().then((text) => setTesto(text));
      //setTesto(file.text().then((text) => text));
    }
  };

  const handleSetGiorno = (giornoDaMostrare, index) => {
    setGiorno(giornoDaMostrare);
    if (index === labels.length - 1) {
      setDisableLeft(false);
      setDisableRight(true);
    } else if (index === 0) {
      setDisableLeft(true);
      setDisableRight(false);
    } else {
      setDisableLeft(false);
      setDisableRight(false);
    }
    setDatiGiorno(valori[labels[index]]);
    setfileCaricato("giorno");
  };

  const handleUploadFile = () => {
    for (var member in valori) delete valori[member];
    let dati = [];
    dati = testo.split("\n");
    dati.shift();
    dati.pop();
    dati.map((dato, index) => (dati[index] = dato.split(";")));
    dati.forEach((dato, index) => {
      let valoriIniziali = dato[0].split(" ");
      dato.shift();
      valori[valoriIniziali[0]] = dato;
    });
    setValori(valori);
    setLabels(Object.getOwnPropertyNames(valori));
    setfileCaricato("caricato");
  };

  return (
    <div className="d-flex flex-column h-100">
      <NavBar
        fileCaricato={fileCaricato}
        onClick={() => {
          setfileCaricato("caricando");
        }}
      ></NavBar>
      <Body
        fileCaricato={fileCaricato}
        handleFileChange={handleFileChange}
        onUpload={handleUploadFile}
        valori={valori}
        fileName={fileName}
        handleSetGiorno={handleSetGiorno}
        giorno={giorno}
        datiGiorno={datiGiorno}
        changeToPreviousDay={() => {
          setDisableRight(false);
          let index = labels.indexOf(giorno);
          if (index === 1) {
            setDisableLeft(true);
          }
          setGiorno(labels[index - 1]);
          setDatiGiorno(valori[labels[index - 1]]);
        }}
        changeToNextDay={() => {
          setDisableLeft(false);
          let index = labels.indexOf(giorno);
          if (index === labels.length - 2) {
            setDisableRight(true);
          }
          setGiorno(labels[index + 1]);
          setDatiGiorno(valori[labels[index + 1]]);
        }}
        labels={labels}
        disableLeft={disableLeft}
        disableRight={disableRight}
        mostraGraficoMese={() => {
          setfileCaricato("caricato");
        }}
      ></Body>
    </div>
  );
}

export default App;
