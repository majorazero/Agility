import React from "react";
import "./ProjectListTab.css";

const ProjectListTab = (props) => {
  return(
    <div className="wrapper">
      <h1>{props.name}</h1>
      <h2>{props.summary}</h2>
      <h2>Due Date: {props.duedate}</h2>
    </div>
  );
}

export default ProjectListTab;
