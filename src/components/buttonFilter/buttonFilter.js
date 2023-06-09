import React from "react";
import "./buttonFilter.css";

const ButtonFilter = (props) => {
  const { clase, nombre, color, tamaño, onClick } = props;

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={`btn btn-${color} btn-${tamaño} ${clase}`}
      onClick={handleClick}
    >
      {nombre}
    </button>
  );
};

export default ButtonFilter;

