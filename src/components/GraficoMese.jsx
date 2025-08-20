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

  return (
    <div className="flex-grow-1 overflow-auto mh-0 ms-3 me-3 mb-2 d-flex flex-column justify-content-center align-items-center">
      <button
        type="button"
        class="btn btn-light"
        onClick={() => setMostraGrafico(!mostraGrafico)}
      >
        Mostra {mostraGrafico ? "Statistiche" : "Grafico"} Mese
      </button>
      {(() => {
        if (mostraGrafico) {
          return (
            <Bar className="overflow-auto" options={options} data={data} />
          );
        } else {
          return (
            <div>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum."
            </div>
          );
        }
      })()}
    </div>
  );
}

export default GraficoMese;
