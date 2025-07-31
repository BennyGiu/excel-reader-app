import GraficoGiorno from "./GraficoGiorno";
import GraficoMese from "./GraficoMese";
import { useState } from "react";

function Body({
  fileCaricato,
  handleFileChange,
  onUpload,
  testo,
  fileName,
  handleSetGiorno,
  giorno,
}) {
  const [datiGiorno, setDatiGiorno] = useState("");

  switch (fileCaricato) {
    case "no":
      return (
        <div className="vh-100 d-flex justify-content-center align-items-center">
          Prima di iniziare carica un file csv con la giusta formattazione
        </div>
      );
    case "caricando":
      return (
        <div className="mx-auto vh-100 d-flex align-items-center row-auto">
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
          testo={testo}
          fileName={fileName}
          handleSetGiorno={handleSetGiorno}
          setDatiGiorno={setDatiGiorno}
        />
      );
    case "giorno":
      return <GraficoGiorno giorno={giorno} datiGiorno={datiGiorno} />;
  }
}

export default Body;
