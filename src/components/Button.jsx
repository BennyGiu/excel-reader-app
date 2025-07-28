import React from "react";

function Button({ color = "primary", children, onClick }) {
  return (
    <button className={"btn btn-" + color} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
