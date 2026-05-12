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
import { motion } from "motion/react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import StatCard from "./StatCard";
import { monthStringToNumber, monthNumberToString } from "../utils/utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function GraficoAnno({
  mostraSelezioneMese,
  testo,
  years,
  months,
  titoloGrafico,
  onClickLeftButton,
  onClickRightButton,
  handleSetMonth,
}) {
  const [mostraGrafico, setMostraGrafico] = useState(true);

  var disableLeft = false;
  var disableRight = false;

  if (years.length === 1) {
    disableLeft = true;
    disableRight = true;
  } else if (years.indexOf(titoloGrafico) === years.length - 1) {
    disableLeft = false;
    disableRight = true;
  } else if (years.indexOf(titoloGrafico) === 0) {
    disableLeft = true;
    disableRight = false;
  } else {
    disableLeft = false;
    disableRight = false;
  }

  var monthsInChosenYear = [];
  for (const month of months) {
    let splittedMonth = month.split("/");
    if (splittedMonth[1] === titoloGrafico) {
      monthsInChosenYear.push(parseInt(splittedMonth[0]));
    }
  }
  var monthsConsumption = [];

  for (let i = 1; i <= 12; i++) {
    if (monthsInChosenYear.includes(i)) {
      let monthNumber = i < 10 ? "0" + i : i;
      const monthData = testo[monthNumber + "/" + titoloGrafico].split("\n");
      let monthObject = {};
      monthData.shift();
      monthData.pop();
      monthData.map((dato, index) => (monthData[index] = dato.split(";")));
      monthData.forEach((dato, index) => {
        let valoriIniziali = dato[0].split(" ");
        dato.shift();
        monthObject[valoriIniziali[0]] = dato;
      });
      const flatArray = Object.values(monthObject).flat();
      const monthKWH = flatArray.reduce((a, b) => +a + +b, 0);
      monthsConsumption.push(monthKWH.toFixed(2));
    } else {
      monthsConsumption.push(0);
    }
  }

  var kWhTotali = 0;
  var kWhMin = 0;
  var kWhMax = 0;
  var meseMin = "";
  var meseMax = "";
  var kWhAvg = 0;

  for (let i = 0; i < 12; i++) {
    if (+monthsConsumption[i] !== 0) {
      kWhTotali += +monthsConsumption[i];
      if (meseMin === "") {
        meseMin = i;
        kWhMin = +monthsConsumption[i];
      } else {
        if (+monthsConsumption[i] < kWhMin) {
          meseMin = i;
          kWhMin = +monthsConsumption[i];
        }
      }
      if (meseMax === "") {
        meseMax = i;
        kWhMax = +monthsConsumption[i];
      } else {
        if (+monthsConsumption[i] > kWhMax) {
          meseMax = i;
          kWhMax = +monthsConsumption[i];
        }
      }
    }
  }

  meseMax++;
  meseMin++;
  kWhAvg = (kWhTotali / monthsInChosenYear.length).toFixed(2);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: titoloGrafico,
      },
    },
    onClick: (event, activeElements) => {
      if (activeElements[0]) {
        let index = activeElements[0]["index"] + 1;
        let monthNumber = index < 10 ? "0" + index : index;
        let monthAndYear = monthNumber + "/" + titoloGrafico;
        handleSetMonth(monthAndYear);
      }
    },
  };

  const labels = Object.getOwnPropertyNames(monthStringToNumber);

  const data = {
    labels,
    datasets: [
      {
        label: "kWh",
        data: monthsConsumption,
        backgroundColor: "rgba(13, 210, 253, 1)",
      },
    ],
  };

  return (
    <div className="flex-grow-1 overflow-auto mb-2 d-flex flex-column align-items-center">
      <div className="d-flex flex-row justify-content-center align-items-center mb-2">
        <button
          type="button"
          className="btn btn-light mx-2"
          onClick={() => mostraSelezioneMese()}
        >
          Seleziona Mese
        </button>
        <button
          type="button"
          className="btn btn-light mx-2"
          onClick={() => setMostraGrafico(!mostraGrafico)}
        >
          Mostra {mostraGrafico ? "Statistiche" : "Grafico"} Anno
        </button>
      </div>
      <div className="d-flex flex-row flex-grow-1 justify-content-center overflow-auto w-100">
        <Button
          disabled={disableLeft}
          onClick={onClickLeftButton}
          className="align-self-center ms-2 btn-link btn-outline-info d-inline-flex align-items-center justify-content-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="black"
            className="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
            />
          </svg>
        </Button>
        <div className="flex-grow-1 overflow-auto mh-0 d-flex flex-column justify-content-center align-items-center">
          {(() => {
            if (mostraGrafico) {
              return (
                <motion.div
                  key={"grafico"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="d-flex flex-column h-100 w-100 align-items-center justify-content-center"
                >
                  <Bar
                    className="overflow-auto"
                    options={options}
                    data={data}
                  />
                </motion.div>
              );
            } else {
              return (
                <motion.div
                  key={"statistiche"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="container overflow-auto"
                >
                  <div className="text-center fs-5 m-1">
                    Statistiche {titoloGrafico}
                  </div>
                  <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 p-1">
                    <StatCard
                      title="kWh Totali"
                      value={kWhTotali + " kWh"}
                      handleClickCard={() => void 0}
                    />
                    <StatCard
                      title="Mese con più kWh"
                      value={
                        monthNumberToString[
                          meseMax < 10 ? "0" + meseMax : meseMax
                        ] +
                        " con " +
                        kWhMax +
                        " kWh"
                      }
                      handleClickCard={() => void 0}
                    />
                    <StatCard
                      title="Mese con meno kWh"
                      value={
                        monthNumberToString[
                          meseMin < 10 ? "0" + meseMin : meseMin
                        ] +
                        " con " +
                        kWhMin +
                        " kWh"
                      }
                      handleClickCard={() => void 0}
                    />
                    <StatCard
                      title="Media mensile kWh consumati"
                      value={kWhAvg + " kWh al mese"}
                      handleClickCard={() => void 0}
                    />
                  </div>
                </motion.div>
              );
            }
          })()}
        </div>
        <Button
          disabled={disableRight}
          onClick={onClickRightButton}
          className="align-self-center me-2 btn-link btn-outline-info d-inline-flex align-items-center justify-content-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="black"
            className="bi bi-arrow-right"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
}

export default GraficoAnno;
