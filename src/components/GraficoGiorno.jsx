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
    <div className="d-flex flex-row flex-grow-1 overflow-auto">
      <Button className="align-self-center ms-3 btn-link btn-outline-info d-flex align-items-center justify-content-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="black"
          class="bi bi-arrow-left"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
          />
        </svg>
      </Button>
      <div className="flex-grow-1 overflow-auto mh-0 d-flex flex-column justify-content-center align-items-center">
        <Bar className="overflow-auto" options={options} data={data} />
      </div>
      <Button className="align-self-center me-3 btn-link btn-outline-info d-flex align-items-center justify-content-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="black"
          class="bi bi-arrow-right"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
          />
        </svg>
      </Button>
    </div>
  );
}

export default GraficoGiorno;
