import StatCard from "./StatCard";
import { motion } from "motion/react";

function SelezionaMese({ months, handleClickCard }) {
  const monthNumberToString = {
    "01": "Gennaio",
    "02": "Febbraio",
    "03": "Marzo",
    "04": "Aprile",
    "05": "Maggio",
    "06": "Giugno",
    "07": "Luglio",
    "08": "Agosto",
    "09": "Settembre",
    10: "Ottobre",
    11: "Novembre",
    12: "Dicembre",
  };

  return (
    <div className="container overflow-auto mw-100">
      <div className="row">
        <div className="col"></div>
        <div className="container col-6 flex-grow-1">
          <motion.div
            key={"selezioneMese"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={
              "row row-cols-1 row-cols-sm-2 row-cols-md-4 p-1 mx-auto d-flex " +
              (months.length < 5 ? "justify-content-center" : "")
            }
          >
            {months.map((month, index) => (
              <StatCard
                handleClickCard={handleClickCard}
                title={month.split("/")[1]}
                value={monthNumberToString[month.split("/")[0]]}
              />
            ))}
          </motion.div>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
}

export default SelezionaMese;
