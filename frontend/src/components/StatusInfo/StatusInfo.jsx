import React from "react";
import "./StatusInfo.css";

const InfoBox = ({ bgColor, title, count, icon }) => {
  return (
    <div className={`infoBox ${bgColor}`}>
      <span className="infoIcon">{icon}</span>
      <span>
        <p>{title}</p>
        <h4>{count}</h4>
      </span>
    </div>
  );
};

export default InfoBox;
