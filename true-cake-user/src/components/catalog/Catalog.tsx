import React from "react";
import "./style.css";

const Catalog = (props: any) => {
  return (
    <div className="catalog-container">
      <div className="catalog-div">
        <div className="catalog-text">
          <p>{props.data.heading}</p>
          <img className="catalog-img" src={props.data.image} alt="catalog" />
        </div>
      </div>
    </div>
  );
};

export default Catalog;
