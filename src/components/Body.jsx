import GraficoGiorno from "./GraficoGiorno";
import GraficoMese from "./GraficoMese";
import SelezionaMese from "./SelezionaMese";
import { motion } from "motion/react";

function Body({
  statoApp,
  handleFileChange,
  onUpload,
  valori,
  fileName,
  handleSetGiorno,
  giorno,
  datiGiorno,
  changeToPreviousDay,
  changeToNextDay,
  changeToPreviousMonth,
  changeToNextMonth,
  labels,
  disableLeft,
  disableRight,
  disableLeftMonth,
  disableRightMonth,
  mostraGraficoMese,
  months,
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
    case "mostraMese":
      return (
        <GraficoMese
          valori={valori}
          fileName={fileName}
          handleSetGiorno={handleSetGiorno}
          labels={labels}
          onClickLeftButton={changeToPreviousMonth}
          onClickRightButton={changeToNextMonth}
          disableLeft={disableLeftMonth}
          disableRight={disableRightMonth}
          mostraSelezioneMese={mostraSelezioneMese}
        />
      );
    case "mostraGiorno":
      return (
        <GraficoGiorno
          onClickLeftButton={changeToPreviousDay}
          onClickRightButton={changeToNextDay}
          giorno={giorno}
          datiGiorno={datiGiorno}
          disableLeft={disableLeft}
          disableRight={disableRight}
          mostraGraficoMese={mostraGraficoMese}
        />
      );
    default:
      return <div>Errore non riconosciuto</div>;
  }
}

export default Body;
