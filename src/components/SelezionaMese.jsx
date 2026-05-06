import StatCard from "./StatCard";
import { motion } from "motion/react";
import { monthNumberToString } from "../utils/utils";

function SelezionaMese({ months, handleClickCard }) {
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
            {months.map((month) => (
              <StatCard
                key={month}
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
