import Body from "./components/Body";
import NavBar from "./components/NavBar";
import Alert from "./components/Alert";
import { useState } from "react";
import "./App.css";

function App() {
  const [statoApp, setStatoApp] = useState("fileNonCaricati");
  const [titolo, setTitolo] = useState("");
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

  // function that loads the files in memory and create an array with the uploaded months
  const handleFileChange = (event) => {
    if (event.target.files) {
      setError("");
      var texts = {};
      var monthsArray = [];
      for (const prop of Object.getOwnPropertyNames(testo)) {
        delete testo[prop];
      }

      const filePromises = [];
      for (const file of event.target.files) {
        let filePromise = file.text();
        filePromises.push(filePromise);
        filePromise.then((text) => {
          let monthAndYear = text.substring(
            text.indexOf("/") + 1,
            text.indexOf("/") + 8,
          );
          monthsArray.push(monthAndYear);
          texts[monthAndYear] = text;
        });
      }

      Promise.all(filePromises).then(() => {
        monthsArray.sort((month1, month2) => {
          let month1Splitted = month1.split("/");
          let newMonth1 = month1Splitted[1] + month1Splitted[0];

          let month2Splitted = month2.split("/");
          let newMonth2 = month2Splitted[1] + month2Splitted[0];

          return newMonth1 - newMonth2;
        });
        setMonths(monthsArray);
        setTesto(texts);
        setTitolo(monthsArray[0]);
      });
    }
  };

  // function that checks if files were uploaded and then goes to the "select month" page
  const handleUploadFile = () => {
    if (titolo === "") {
      setError("Seleziona almeno un file da caricare");
      return;
    }
    for (var member in valori) delete valori[member];
    setStatoApp("selezionaMese");
  };

  // function that loads some test files that are present in the public folder
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
    }
    setStatoApp("selezionaMese");
  };

  // function that loads the data of a specific month and then shows its graph
  const handleClickCard = (chosenMonth) => {
    //console.log(chosenMonth);
    for (var member in valori) delete valori[member];
    let dati = [];
    dati = testo[chosenMonth].split("\n");
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
    } else if (months.indexOf(chosenMonth) === months.length - 1) {
      setDisableLeftMonth(false);
      setDisableRightMonth(true);
    } else if (months.indexOf(chosenMonth) === 0) {
      setDisableLeftMonth(true);
      setDisableRightMonth(false);
    } else {
      setDisableLeftMonth(false);
      setDisableRightMonth(false);
    }
    setValori(valori);
    setLabels(Object.getOwnPropertyNames(valori));
    setTitolo(chosenMonth);
    setStatoApp("mostraMese");
  };

  // function that loads the data of a specific day and then shows its graph
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
    setStatoApp("mostraGiorno");
  };

  return (
    <div className="d-flex flex-column h-100">
      <NavBar
        statoApp={statoApp}
        onClick={() => {
          setStatoApp("caricandoFile");
          setTitolo("");
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
        statoApp={statoApp}
        handleFileChange={handleFileChange}
        onUpload={handleUploadFile}
        valori={valori}
        fileName={titolo}
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
          let index = months.indexOf(titolo);
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
          setTitolo(months[index - 1]);
          setValori(valori);
          setLabels(Object.getOwnPropertyNames(valori));
          //handleUploadFile();
        }}
        changeToNextMonth={() => {
          setDisableLeftMonth(false);
          let index = months.indexOf(titolo);
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
          setTitolo(months[index + 1]);
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
          setStatoApp("mostraMese");
        }}
        mostraSelezioneMese={() => {
          setStatoApp("selezionaMese");
        }}
        months={months}
        handleClickCard={handleClickCard}
      ></Body>
    </div>
  );
}

export default App;
