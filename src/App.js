import Body from "./components/Body";
import NavBar from "./components/NavBar";
import Alert from "./components/Alert";
import { useState } from "react";
import "./App.css";

function App() {
  const [fileCaricato, setfileCaricato] = useState("no");
  const [fileName, setFileName] = useState("");
  const [testo, setTesto] = useState({});
  const [error, setError] = useState("");
  const [months, setMonths] = useState([]);
  const [giorno, setGiorno] = useState("");
  const [valori, setValori] = useState({});
  const [labels, setLabels] = useState([]);
  const [datiGiorno, setDatiGiorno] = useState("");
  const [disableLeft, setDisableLeft] = useState(false);
  const [disableRight, setDisableRight] = useState(false);
  const [disableLeftMonth, setDisableLeftMonth] = useState(false);
  const [disableRightMonth, setDisableRightMonth] = useState(false);

  const handleFileChange = (event) => {
    if (event.target.files) {
      setError("");
      var texts = {};
      var monthsArray = [];
      for (const prop of Object.getOwnPropertyNames(testo)) {
        delete testo[prop];
      }
      for (const file of event.target.files) {
        file.text().then((text) => {
          let monthAndYear = text.substring(
            text.indexOf("/") + 1,
            text.indexOf("/") + 8,
          );
          monthsArray.push(monthAndYear);
          setMonths(monthsArray);
          texts[monthAndYear] = text;
          setTesto(texts);
          setFileName(monthsArray[0]);
        });
      }
      for (const prop of Object.getOwnPropertyNames(texts)) {
        delete texts[prop];
      }
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
    if (fileName === "") {
      setError("Seleziona almeno un file da caricare");
      return;
    }
    for (var member in valori) delete valori[member];
    let dati = [];
    dati = testo[fileName].split("\n");
    dati.shift();
    dati.pop();
    dati.map((dato, index) => (dati[index] = dato.split(";")));
    dati.forEach((dato, index) => {
      let valoriIniziali = dato[0].split(" ");
      dato.shift();
      valori[valoriIniziali[0]] = dato;
    });

    if (months.length === 1) {
      setDisableLeftMonth(true);
      setDisableRightMonth(true);
    } else if (months.indexOf(fileName) === months.length - 1) {
      setDisableLeftMonth(false);
      setDisableRightMonth(true);
    } else if (months.indexOf(fileName) === 0) {
      setDisableLeftMonth(true);
      setDisableRightMonth(false);
    } else {
      setDisableLeftMonth(false);
      setDisableRightMonth(false);
    }
    setValori(valori);
    setLabels(Object.getOwnPropertyNames(valori));
    setfileCaricato("caricato");
  };

  const handleClickProva = async () => {
    setError("");
    var texts = {};
    var monthsArray = [];
    for (const prop of Object.getOwnPropertyNames(testo)) {
      delete testo[prop];
    }
    const file_di_prova = [
      process.env.PUBLIC_URL + "/2024-04.csv",
      process.env.PUBLIC_URL + "/2024-05.csv",
      process.env.PUBLIC_URL + "/2024-06.csv",
    ];
    for (const file of file_di_prova) {
      const handleFile = await fetch(file);
      const text = await handleFile.text();
      let monthAndYear = text.substring(
        text.indexOf("/") + 1,
        text.indexOf("/") + 8,
      );
      monthsArray.push(monthAndYear);
      setMonths(monthsArray);
      texts[monthAndYear] = text;
      setTesto(texts);
      setFileName(monthsArray[0]);
    }

    for (var member in valori) delete valori[member];

    let dati = [];
    dati = texts[monthsArray[0]].split("\n");
    dati.shift();
    dati.pop();
    dati.map((dato, index) => (dati[index] = dato.split(";")));
    dati.forEach((dato, index) => {
      let valoriIniziali = dato[0].split(" ");
      dato.shift();
      valori[valoriIniziali[0]] = dato;
    });

    if (monthsArray.length === 1) {
      setDisableLeftMonth(true);
      setDisableRightMonth(true);
    } else if (monthsArray.indexOf(monthsArray[0]) === monthsArray.length - 1) {
      setDisableLeftMonth(false);
      setDisableRightMonth(true);
    } else if (monthsArray.indexOf(monthsArray[0]) === 0) {
      setDisableLeftMonth(true);
      setDisableRightMonth(false);
    } else {
      setDisableLeftMonth(false);
      setDisableRightMonth(false);
    }
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
          setFileName("");
          setTesto({});
          setMonths([]);
          setValori({});
          setLabels([]);
          setDatiGiorno("");
          setGiorno("");
        }}
        onClickProva={handleClickProva}
      ></NavBar>
      <Alert resetAlert={() => setError("")} message={error} />
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
        changeToPreviousMonth={() => {
          setDisableRightMonth(false);
          let index = months.indexOf(fileName);
          if (index === 1) {
            setDisableLeftMonth(true);
          }
          for (var member in valori) delete valori[member];
          let dati = [];
          dati = testo[months[index - 1]].split("\n");
          dati.shift();
          dati.pop();
          dati.map((dato, index) => (dati[index] = dato.split(";")));
          dati.forEach((dato, index) => {
            let valoriIniziali = dato[0].split(" ");
            dato.shift();
            valori[valoriIniziali[0]] = dato;
          });
          setFileName(months[index - 1]);
          setValori(valori);
          setLabels(Object.getOwnPropertyNames(valori));
          //handleUploadFile();
        }}
        changeToNextMonth={() => {
          setDisableLeftMonth(false);
          let index = months.indexOf(fileName);
          if (index === months.length - 2) {
            setDisableRightMonth(true);
          }
          for (var member in valori) delete valori[member];
          let dati = [];
          dati = testo[months[index + 1]].split("\n");
          dati.shift();
          dati.pop();
          dati.map((dato, index) => (dati[index] = dato.split(";")));
          dati.forEach((dato, index) => {
            let valoriIniziali = dato[0].split(" ");
            dato.shift();
            valori[valoriIniziali[0]] = dato;
          });
          setFileName(months[index + 1]);
          setValori(valori);
          setLabels(Object.getOwnPropertyNames(valori));
          //handleUploadFile();
        }}
        labels={labels}
        disableLeft={disableLeft}
        disableRight={disableRight}
        disableLeftMonth={disableLeftMonth}
        disableRightMonth={disableRightMonth}
        mostraGraficoMese={() => {
          setfileCaricato("caricato");
        }}
      ></Body>
    </div>
  );
}

export default App;
