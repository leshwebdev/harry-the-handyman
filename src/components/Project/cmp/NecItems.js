import React from "react";

function NecItems(props) {
  return (
    <div className="nec-items mt-1 d-flex flex-wrap">
      {props.items.map((item, index) => (
        <div className="nec-item" key={index}>{item.name}</div>
      ))}
    </div>
  );
}

export default NecItems;
