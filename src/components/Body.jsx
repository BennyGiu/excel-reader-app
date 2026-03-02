import GraficoGiorno from "./GraficoGiorno";
import GraficoMese from "./GraficoMese";
import { motion } from "motion/react";

function Body({
  fileCaricato,
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
}) {
  switch (fileCaricato) {
    case "no":
      return (
        <motion.div
          key={"startText"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center h-100 d-flex justify-content-center align-items-center"
        >
          Prima di iniziare carica un file csv con la giusta formattazione
        </motion.div>
      );
    case "caricando":
      return (
        <motion.div
          key={"uploadingText"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mx-auto h-100 d-flex align-items-center row-auto"
        >
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
    case "caricato":
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
        />
      );
    case "giorno":
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
      return <div>Siamo nella merda</div>;
  }
}

export default Body;
