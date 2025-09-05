import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useState } from "react";
import StatCard from "./StatCard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function GraficoMese({ valori, fileName, handleSetGiorno, labels }) {
  const [mostraGrafico, setMostraGrafico] = useState(true);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: fileName.split(".")[0],
      },
    },
    onClick: (event, activeElements) => {
      if (activeElements[0]) {
        let index = activeElements[0]["index"];
        handleSetGiorno(labels[index], index);
      }
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "kWh",
        data: labels.map((item) => {
          let dayArray = [];
          dayArray = valori[item];
          return dayArray.reduce((a, b) => +a + +b, 0);
        }),
        backgroundColor: "rgba(13, 210, 253, 1)",
      },
    ],
  };

  var kWhTotali = 0;
  var kWhF1 = 0;
  var kWhF2 = 0;
  var kWhF3 = 0;

  var giornoMaxkWh = "";
  var valGiornoMaxkWh = "";

  var oraMaxkWh = "";
  var giornoOraMaxkWh = "";
  var valOraMaxkWh = "";

  var mezzoraMaxkWh = "";
  var giornoMezzoraMaxkWh = "";
  var valMezzoraMaxkWh = "";

  var quartodoraMaxkWh = "";
  var giornoQuartodoraMaxkWh = "";
  var valQuartodoraMaxkWh = "";

  console.log(valori);

  for (const property in valori) {
    // construct day
    const partsOfDay = property.split("/");
    const day = parseInt(partsOfDay[0], 10);
    const month = parseInt(partsOfDay[1], 10);
    const year = parseInt(partsOfDay[2], 10);
    const date = new Date(year, month - 1, day);
    const dayIndex = date.getDay();

    const dayArray = valori[property];

    var kWhofDay = 0;

    // Manca il controllo sulle festività infrasettimanali
    // Domenica
    if (dayIndex === 0) {
      for (const element of dayArray) {
        kWhF3 = kWhF3 + +element;
        kWhofDay += +element;
      }
    }
    // Sabato
    else if (dayIndex === 6) {
      for (var i = 0; i < 28; i++) {
        kWhF3 = kWhF3 + +dayArray[i];
        kWhofDay += +dayArray[i];
      }

      for (i = 28; i < 92; i++) {
        kWhF2 = kWhF2 + +dayArray[i];
        kWhofDay += +dayArray[i];
      }

      for (i = 92; i < 96; i++) {
        kWhF3 = kWhF3 + +dayArray[i];
        kWhofDay += +dayArray[i];
      }
    }
    // Lunedì - Venerdì
    else {
      for (var i = 0; i < 28; i++) {
        kWhF3 = kWhF3 + +dayArray[i];
        kWhofDay += +dayArray[i];
      }

      for (i = 28; i < 32; i++) {
        kWhF2 = kWhF2 + +dayArray[i];
        kWhofDay += +dayArray[i];
      }

      for (i = 32; i < 76; i++) {
        kWhF1 = kWhF1 + +dayArray[i];
        kWhofDay += +dayArray[i];
      }

      for (i = 76; i < 92; i++) {
        kWhF2 = kWhF2 + +dayArray[i];
        kWhofDay += +dayArray[i];
      }

      for (i = 92; i < 96; i++) {
        kWhF3 = kWhF3 + +dayArray[i];
        kWhofDay += +dayArray[i];
      }
    }

    if (valGiornoMaxkWh < kWhofDay) {
      valGiornoMaxkWh = kWhofDay;
      giornoMaxkWh = property;
    }
  }

  kWhF1 = kWhF1.toFixed(2);
  kWhF2 = kWhF2.toFixed(2);
  kWhF3 = kWhF3.toFixed(2);

  kWhTotali = +kWhF1 + +kWhF2 + +kWhF3;
  kWhTotali = kWhTotali.toFixed(2);

  var arrayOfkWhHours = [];
  for (const property in valori) {
    for (var i = 0; i < 96; i = i + 4) {
      arrayOfkWhHours.push(
        +valori[property][i] +
          +valori[property][i + 1] +
          +valori[property][i + 2] +
          +valori[property][i + 3]
      );
    }
  }

  valOraMaxkWh = Math.max(...arrayOfkWhHours);
  oraMaxkWh = arrayOfkWhHours.indexOf(valOraMaxkWh) % 24;
  giornoOraMaxkWh = Math.floor(arrayOfkWhHours.indexOf(valOraMaxkWh) / 24) + 1;

  var arrayOfkWhHalfHours = [];
  for (const property in valori) {
    for (var i = 0; i < 96; i = i + 2) {
      arrayOfkWhHalfHours.push(+valori[property][i] + +valori[property][i + 1]);
    }
  }

  valMezzoraMaxkWh = Math.max(...arrayOfkWhHalfHours);
  mezzoraMaxkWh = arrayOfkWhHalfHours.indexOf(valMezzoraMaxkWh) % 48;
  giornoMezzoraMaxkWh =
    Math.floor(arrayOfkWhHalfHours.indexOf(valMezzoraMaxkWh) / 48) + 1;
  if (mezzoraMaxkWh % 2 === 0) {
    mezzoraMaxkWh = mezzoraMaxkWh / 2 + ":00-" + mezzoraMaxkWh / 2 + ":30";
  } else {
    mezzoraMaxkWh =
      Math.floor(mezzoraMaxkWh / 2) +
      ":30-" +
      (Math.floor(mezzoraMaxkWh / 2) + 1) +
      ":00";
  }

  var arrayOfkWhQuartHours = [];
  for (const property in valori) {
    for (var i = 0; i < 96; i++) {
      arrayOfkWhQuartHours.push(+valori[property][i]);
    }
  }
  console.log("ciao");
  console.log(arrayOfkWhQuartHours);

  valQuartodoraMaxkWh = Math.max(...arrayOfkWhQuartHours);
  quartodoraMaxkWh = arrayOfkWhQuartHours.indexOf(valQuartodoraMaxkWh) % 96;
  giornoQuartodoraMaxkWh =
    Math.floor(arrayOfkWhQuartHours.indexOf(valQuartodoraMaxkWh) / 96) + 1;

  if (quartodoraMaxkWh % 4 === 0) {
    quartodoraMaxkWh =
      quartodoraMaxkWh / 4 + ":00-" + quartodoraMaxkWh / 4 + ":15";
  } else if (quartodoraMaxkWh % 4 === 1) {
    quartodoraMaxkWh =
      Math.floor(quartodoraMaxkWh / 4) +
      ":15-" +
      Math.floor(quartodoraMaxkWh / 4) +
      ":30";
  } else if (quartodoraMaxkWh % 4 === 2) {
    quartodoraMaxkWh =
      Math.floor(quartodoraMaxkWh / 4) +
      ":30-" +
      Math.floor(quartodoraMaxkWh / 4) +
      ":45";
  } else {
    quartodoraMaxkWh =
      Math.floor(quartodoraMaxkWh / 4) +
      ":45-" +
      (Math.floor(quartodoraMaxkWh / 4) + 1) +
      ":00";
  }

  return (
    <div className="flex-grow-1 overflow-auto mh-0 ms-3 me-3 mb-2 d-flex flex-column align-items-center">
      <button
        type="button"
        className="btn btn-light"
        onClick={() => setMostraGrafico(!mostraGrafico)}
      >
        Mostra {mostraGrafico ? "Statistiche" : "Grafico"} Mese
      </button>
      <div className="d-flex flex-row flex-grow-1 justify-content-center overflow-auto w-100">
        <div className="flex-grow-1 overflow-auto mh-0 d-flex flex-column justify-content-center align-items-center">
          {(() => {
            if (mostraGrafico) {
              return (
                <Bar className="overflow-auto" options={options} data={data} />
              );
            } else {
              return (
                <div className="container overflow-auto">
                  <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 p-1">
                    <StatCard title="kWh Totali" value={kWhTotali} />
                    <StatCard title="kWh F1" value={kWhF1} />
                    <StatCard title="kWh F2" value={kWhF2} />
                    <StatCard title="kWh F3" value={kWhF3} />
                    <StatCard
                      title="Giorno con più kWh"
                      value={
                        giornoMaxkWh +
                        " con " +
                        valGiornoMaxkWh.toFixed(2) +
                        " kWh"
                      }
                    />
                    <StatCard
                      title="Ora con più kWh"
                      value={
                        valOraMaxkWh.toFixed(2) +
                        " kWh alle " +
                        oraMaxkWh +
                        "-" +
                        (oraMaxkWh + 1) +
                        " di giorno " +
                        giornoOraMaxkWh
                      }
                    />
                    <StatCard
                      title="Mezz'ora con più kWh"
                      value={
                        valMezzoraMaxkWh.toFixed(2) +
                        " kWh alle " +
                        mezzoraMaxkWh +
                        " di giorno " +
                        giornoMezzoraMaxkWh
                      }
                    />
                    <StatCard
                      title="Quarto d'ora con più kWh"
                      value={
                        valQuartodoraMaxkWh.toFixed(2) +
                        " kWh alle " +
                        quartodoraMaxkWh +
                        " di giorno " +
                        giornoQuartodoraMaxkWh
                      }
                    />
                  </div>
                </div>
              );
            }
          })()}
        </div>
      </div>
    </div>
  );
}

export default GraficoMese;
