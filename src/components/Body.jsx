import GraficoGiorno from "./GraficoGiorno";
import GraficoMese from "./GraficoMese";

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
  labels,
  disableLeft,
  disableRight,
  mostraGraficoMese,
}) {
  switch (fileCaricato) {
    case "no":
      return (
        <div className="h-100 d-flex justify-content-center align-items-center">
          Prima di iniziare carica un file csv con la giusta formattazione
        </div>
      );
    case "caricando":
      return (
        <div className="mx-auto h-100 d-flex align-items-center row-auto">
          <input
            className="form-control col m-3"
            type="file"
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
        </div>
      );
    case "caricato":
      return (
        <GraficoMese
          valori={valori}
          fileName={fileName}
          handleSetGiorno={handleSetGiorno}
          labels={labels}
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
  }
}

export default Body;
