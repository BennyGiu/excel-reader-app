import Alert from "./components/Alert";
import Button from "./components/Button";
import ListGroup from "./components/ListGroup";
import Message from "./Message";
import { useState } from "react";

function App() {
  /*let items = [
    "Genshin Impact",
    "Honkai star Rail",
    "Reverse 1999",
    "Arknights",
  ];

  let heading = "Giochi";

  items = ["Palermo", "Roma", "Milano", "Torino"];
  heading = "Città";

  const handleSelectItem = (item) => {
    console.log(item);
  };

  return (
    <div className="App">
      <ListGroup
        items={items}
        heading={heading}
        onSelectItem={handleSelectItem}
      />
    </div>
  );*/

  const [showAlert, setShowAlert] = useState(false);

  return (
    <div>
      {showAlert && (
        <Alert onClose={() => setShowAlert(false)}>Bomboclat!</Alert>
      )}
      <Button color="danger" onClick={() => setShowAlert(true)}>
        Nice Button
      </Button>
    </div>
  );
}

export default App;
