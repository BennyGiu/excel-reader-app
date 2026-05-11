import Body from "./components/Body";
import NavBar from "./components/NavBar";
import Alert from "./components/Alert";
import { useState } from "react";
import "./App.css";

function App() {
  const [error, setError] = useState("");
  const [statoApp, setStatoApp] = useState("fileNonCaricati");
  const [titoloGrafico, setTitoloGrafico] = useState("");
  const [testo, setTesto] = useState({});
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);
  const [giorno, setGiorno] = useState("");
  const [valori, setValori] = useState({});
  const [giorni, setGiorni] = useState([]);

  // function that loads the files in memory and create an array with the uploaded months
  const handleFileChange = (event) => {
    if (event.target.files) {
      setError("");
      var texts = {};
      var monthsArray = [];
      var yearsSet = new Set();
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
          let year = text.substring(
            text.indexOf("/") + 4,
            text.indexOf("/") + 8,
          );
          yearsSet.add(year);
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
        const yearsArray = Array.from(yearsSet).sort();
        setYears(yearsArray);
        setTitoloGrafico(yearsArray[yearsArray.length - 1]);
        setMonths(monthsArray);
        setTesto(texts);
      });
    }
  };

  // function that checks if files were uploaded and then goes to the "select month" page
  const handleUploadFile = () => {
    if (titoloGrafico === "") {
      setError("Seleziona almeno un file da caricare");
      return;
    }
    for (var member in valori) delete valori[member];
    setStatoApp("mostraAnno");
  };

  // function that loads some test files that are present in the public folder
  const handleClickProva = async () => {
    setError("");
    var texts = {};
    var monthsArray = [];
    var yearsSet = new Set();
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
      texts[monthAndYear] = text;
      let year = text.substring(text.indexOf("/") + 4, text.indexOf("/") + 8);
      yearsSet.add(year);
    }
    const yearsArray = Array.from(yearsSet).sort();
    setYears(yearsArray);
    setTitoloGrafico(yearsArray[yearsArray.length - 1]);
    setMonths(monthsArray);
    setTesto(texts);
    setStatoApp("mostraAnno");
  };

  // function that loads the data of a specific month and then shows its graph
  const handleClickCard = (chosenMonth) => {
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
    setValori(valori);
    setGiorni(Object.getOwnPropertyNames(valori));
    setTitoloGrafico(chosenMonth);
    setStatoApp("mostraMese");
  };

  // function that loads the data of a specific day and then shows its graph
  const handleSetGiorno = (giornoDaMostrare, index) => {
    setGiorno(giornoDaMostrare);
    setStatoApp("mostraGiorno");
  };

  return (
    <div className="d-flex flex-column h-100">
      <NavBar
        statoApp={statoApp}
        onClick={() => {
          setStatoApp("caricandoFile");
          setTitoloGrafico("");
          setTesto({});
          setMonths([]);
          setValori({});
          setGiorni([]);
          setGiorno("");
        }}
        onClickProva={handleClickProva}
      ></NavBar>
      <Alert resetAlert={() => setError("")} message={error} />
      <Body
        statoApp={statoApp}
        testo={testo}
        handleFileChange={handleFileChange}
        onUpload={handleUploadFile}
        valori={valori}
        titoloGrafico={titoloGrafico}
        handleSetGiorno={handleSetGiorno}
        giorno={giorno}
        datiGiorno={valori[giorno]}
        changeToPreviousDay={() => {
          let index = giorni.indexOf(giorno);
          setGiorno(giorni[index - 1]);
        }}
        changeToNextDay={() => {
          let index = giorni.indexOf(giorno);
          setGiorno(giorni[index + 1]);
        }}
        changeToPreviousMonth={() => {
          let index = months.indexOf(titoloGrafico);
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
          setTitoloGrafico(months[index - 1]);
          setValori(valori);
          setGiorni(Object.getOwnPropertyNames(valori));
        }}
        changeToNextMonth={() => {
          let index = months.indexOf(titoloGrafico);
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
          setTitoloGrafico(months[index + 1]);
          setValori(valori);
          setGiorni(Object.getOwnPropertyNames(valori));
        }}
        changeToNextYear={() => {
          let index = years.indexOf(titoloGrafico);
          setTitoloGrafico(years[index + 1]);
        }}
        changeToPreviousYear={() => {
          let index = years.indexOf(titoloGrafico);
          setTitoloGrafico(years[index - 1]);
        }}
        giorni={giorni}
        mostraGraficoMese={() => {
          setStatoApp("mostraMese");
        }}
        mostraSelezioneMese={() => {
          setStatoApp("selezionaMese");
        }}
        months={months}
        years={years}
        handleClickCard={handleClickCard}
      ></Body>
    </div>
  );
}

export default App;
