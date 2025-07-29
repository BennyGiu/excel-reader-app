import React from "react";
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

function Body({ fileCaricato, handleFileChange, onUpload, testo, fileName }) {
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
      let dati = [];
      dati = testo.split("\n");
      dati.shift();
      dati.pop();
      dati.map((dato, index) => (dati[index] = dato.split(";")));
      let valori = {};
      dati.map((dato, index) => {
        let valoriIniziali = dato[0].split(" ");
        dato.shift();
        valori[valoriIniziali[0]] = dato;
      });

      let labels = Object.getOwnPropertyNames(valori);

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
            console.log(labels[index]);
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
        <div className="vh-100 d-flex justify-content-center align-items-center">
          <Bar options={options} data={data} />
        </div>
      );
  }
}

export default Body;
