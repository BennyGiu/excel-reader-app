import GraficoAnno from "./GraficoAnno";
import GraficoGiorno from "./GraficoGiorno";
import GraficoMese from "./GraficoMese";
import SelezionaMese from "./SelezionaMese";
import { motion } from "motion/react";

function Body({
  statoApp,
  testo,
  handleFileChange,
  onUpload,
  valori,
  titoloGrafico,
  handleSetGiorno,
  giorno,
  datiGiorno,
  changeToPreviousDay,
  changeToNextDay,
  changeToPreviousMonth,
  changeToNextMonth,
  changeToPreviousYear,
  changeToNextYear,
  giorni,
  mostraGraficoMese,
  months,
  years,
  handleClickCard,
  mostraSelezioneMese,
}) {
  switch (statoApp) {
    case "fileNonCaricati":
      return (
        <motion.div
          key={"startText"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center h-100 d-flex justify-content-center align-items-center"
        >
          Per iniziare carica uno o più file csv scaricati dall'app
          e-Distribuzione o che seguono la stessa formattazione
        </motion.div>
      );
    case "caricandoFile":
      return (
        <motion.div
          key={"uploadingText"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mx-auto h-100 d-flex align-items-center row-auto"
        >
          {/* maybe it should be changed to a form element */}
          <input
            className="form-control col m-3"
            type="file"
            accept=".csv"
            multiple
            id="formFile"
            onChange={handleFileChange}
          ></input>
          <button
            type="submit"
            className="btn btn-primary col-auto m-3"
            onClick={onUpload}
          >
            Carica
          </button>
        </motion.div>
      );
    case "selezionaMese":
      return (
        <SelezionaMese months={months} handleClickCard={handleClickCard} />
      );
    case "mostraAnno":
      return (
        <GraficoAnno
          testo={testo}
          mostraSelezioneMese={mostraSelezioneMese}
          years={years}
          months={months}
          titoloGrafico={titoloGrafico}
          onClickLeftButton={changeToPreviousYear}
          onClickRightButton={changeToNextYear}
        />
      );
    case "mostraMese":
      return (
        <GraficoMese
          months={months}
          valori={valori}
          titoloGrafico={titoloGrafico}
          handleSetGiorno={handleSetGiorno}
          giorni={giorni}
          onClickLeftButton={changeToPreviousMonth}
          onClickRightButton={changeToNextMonth}
          mostraSelezioneMese={mostraSelezioneMese}
        />
      );
    case "mostraGiorno":
      return (
        <GraficoGiorno
          onClickLeftButton={changeToPreviousDay}
          onClickRightButton={changeToNextDay}
          giorni={giorni}
          giorno={giorno}
          datiGiorno={datiGiorno}
          mostraGraficoMese={mostraGraficoMese}
        />
      );
    default:
      return <div>Errore non riconosciuto</div>;
  }
}

export default Body;
