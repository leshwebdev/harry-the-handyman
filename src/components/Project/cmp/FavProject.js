import React from "react";
// import { Button } from "react-bootstrap";

function FavProject(props) {
    return (
      <div className="flex col">
        {props.project.name}
      </div>
    );
}

export default FavProject;
