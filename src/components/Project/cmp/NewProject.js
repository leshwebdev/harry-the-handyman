import React from "react";
import NewProjectForm from "./NewProjectForm";

function NewProject(props) {
  const addThing = (param, details) => {props.onAddThing(param, details)};
  return (
    <div className="container flex col">
      <NewProjectForm
        onAddThing={addThing}
        items={props.items}
      ></NewProjectForm>
    </div>
  );
}

export default NewProject;
