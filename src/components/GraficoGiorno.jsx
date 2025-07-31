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

function GraficoGiorno({ giorno, datiGiorno }) {
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

  for (let i = 0; i < 24; i++) {
    labels.push(i + "-" + (i + 1));
  }

  let valori = [];

  for (let i = 0; i < 96; i = i + 4) {
    valori.push(
      +datiGiorno[i] +
        +datiGiorno[i + 1] +
        +datiGiorno[i + 2] +
        +datiGiorno[i + 3]
    );
  }

  const data = {
    labels,
    datasets: [
      {
        label: "kWh",
        data: valori,
        backgroundColor: "rgba(30, 238, 238, 0.5)",
      },
    ],
  };

  return (
    <div className="row-auto vh-100 d-flex justify-content-center align-items-center">
      <Bar options={options} data={data} />
    </div>
  );
}

export default GraficoGiorno;
