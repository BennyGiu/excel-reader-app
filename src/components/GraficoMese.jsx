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

function GraficoMese({
  valori,
  fileName,
  handleSetGiorno,
  setDatiGiorno,
  labels,
}) {
  /*let dati = [];
  dati = testo.split("\n");
  dati.shift();
  dati.pop();
  dati.map((dato, index) => (dati[index] = dato.split(";")));
  let valori = {};
  dati.map((dato, index) => {
    let valoriIniziali = dato[0].split(" ");
    dato.shift();
    valori[valoriIniziali[0]] = dato;
  });*/

  //let labels = Object.getOwnPropertyNames(valori);

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
        backgroundColor: "rgba(30, 238, 238, 0.5)",
      },
    ],
  };

  return (
    <div className="flex-grow-1 overflow-auto mh-0 d-flex flex-column justify-content-center align-items-center">
      <Bar className="overflow-auto" options={options} data={data} />
    </div>
  );
}

export default GraficoMese;
