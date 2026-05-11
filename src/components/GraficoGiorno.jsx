import { Button } from "react-bootstrap";
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
import { motion } from "motion/react";

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

function GraficoGiorno({
  giorni,
  giorno,
  datiGiorno,
  onClickLeftButton,
  onClickRightButton,
  mostraGraficoMese,
}) {
  const [intervalloGrafico, setIntervalloGrafico] = useState("60");

  var disableLeft;
  var disableRight;

  if (giorni.length === 1) {
    disableLeft = true;
    disableRight = true;
  } else if (giorni.indexOf(giorno) === giorni.length - 1) {
    disableLeft = false;
    disableRight = true;
  } else if (giorni.indexOf(giorno) === 0) {
    disableLeft = true;
    disableRight = false;
  } else {
    disableLeft = false;
    disableRight = false;
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: giorno,
      },
    },
  };

  let labels = [];
  let valori = [];
  let data = {};

  switch (intervalloGrafico) {
    case "60":
      for (let i = 0; i < 24; i++) {
        labels.push(i + "-" + (i + 1));
      }
      for (let i = 0; i < 96; i = i + 4) {
        valori.push(
          +datiGiorno[i] +
            +datiGiorno[i + 1] +
            +datiGiorno[i + 2] +
            +datiGiorno[i + 3],
        );
      }
      data = {
        labels,
        datasets: [
          {
            label: "kWh",
            data: valori,
            backgroundColor: "rgba(13, 210, 253, 1)",
          },
        ],
      };

      break;
    case "30":
      for (let i = 0; i < 48; i++) {
        if (i % 2 === 0) {
          labels.push(i / 2 + ":00" + "-" + i / 2 + ":30");
        } else {
          labels.push(
            Math.floor(i / 2) + ":30" + "-" + (Math.floor(i / 2) + 1) + ":00",
          );
        }
      }
      for (let i = 0; i < 96; i = i + 2) {
        valori.push(+datiGiorno[i] + +datiGiorno[i + 1]);
      }
      data = {
        labels,
        datasets: [
          {
            label: "kWh",
            data: valori,
            backgroundColor: "rgba(13, 210, 253, 1)",
          },
        ],
      };
      break;
    case "15":
      for (let i = 0; i < 96; i++) {
        if (i % 4 === 0) {
          labels.push(i / 4 + ":00" + "-" + i / 4 + ":15");
        } else if (i % 4 === 1) {
          labels.push(
            Math.floor(i / 4) + ":15" + "-" + Math.floor(i / 4) + ":30",
          );
        } else if (i % 4 === 2) {
          labels.push(
            Math.floor(i / 4) + ":30" + "-" + Math.floor(i / 4) + ":45",
          );
        } else if (i % 4 === 3) {
          labels.push(
            Math.floor(i / 4) + ":45" + "-" + (Math.floor(i / 4) + 1) + ":00",
          );
        }
      }
      for (let i = 0; i < 96; i++) {
        valori.push(+datiGiorno[i]);
      }
      data = {
        labels,
        datasets: [
          {
            label: "kWh",
            data: valori,
            backgroundColor: "rgba(13, 210, 253, 1)",
          },
        ],
      };
      break;
    default:
      break;
  }

  const handleChangeIntervallo = (event) => {
    setIntervalloGrafico(event.target.value);
  };

  return (
    <div className="flex-grow-1 overflow-auto mh-0 mb-2 d-flex flex-column justify-content-center align-items-center">
      <div className="d-flex flex-row justify-content-center align-items-center">
        <div>Intervallo:</div>
        <div className="mx-2">
          <select
            defaultValue="60"
            className="form-select"
            aria-label="Default select example"
            onChange={handleChangeIntervallo}
          >
            <option value="60">60 minuti</option>
            <option value="30">30 minuti</option>
            <option value="15">15 minuti</option>
          </select>
        </div>
        <div className="mx-2">
          <button
            type="button"
            className="btn btn-light"
            onClick={mostraGraficoMese}
          >
            Ritorna al Grafico del Mese
          </button>
        </div>
      </div>
      <div className="d-flex flex-row flex-grow-1 overflow-auto w-100">
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-grow-1 overflow-auto mh-0 d-flex flex-column justify-content-center align-items-center"
        >
          <Bar className="overflow-auto" options={options} data={data} />
        </motion.div>
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

export default GraficoGiorno;
