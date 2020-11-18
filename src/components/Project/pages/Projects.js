import React, { useState } from "react";
import { Link } from 'react-router-dom'
import { Card, Row, Col, Button } from "react-bootstrap";
import ProjFilter from "../cmp/ProjFilter"

function Projects(props) {
  const [state, setState] = useState({
    filter: ''
  });

  const filterRes = (value) => {
    setState((state) => ({ ...state, filter: value }));
  }

  let projectsToShow = null;
  if (!state.filter) {
    projectsToShow = props.projects;
  } else {
    projectsToShow = props.projects.filter(project => project.name.toLowerCase().includes(state.filter.toLowerCase()) || project.description.toLowerCase().includes(state.filter.toLowerCase()) )
  }
 
  return (
    <div className="container flex col">
      <Row className="projects-header">
        <Col sm={12} md={3}>
          <h2>Projects:</h2>
        </Col>
        <Col sm={12} md={6} className="flex align-items-center"><ProjFilter onFilterRes={filterRes}></ProjFilter></Col>
        <Col sm={12} md={3} className="flex justify-content-end">
          <Link to={{pathname: `/newproject`}}>
            <Button variant="primary" className="btn-add-project" onClick={() => props.onAddThing()} block>Add New Project</Button>
          </Link>
        </Col>
      </Row>
        {projectsToShow.map((project, index) => (
          <div className="mx-3" key={index}>
            <Card className="mt-3 p-3">
              <Row className="align-items-center">
                <Col sm={3} md={2} className="d-flex justify-content-center"><img className="item-img" src={project.imgUrl} alt="" /></Col>
                  <Col sm={8} md={7} className="mb-2">
                    {/* <div className="d-flex flex-column align-items-center"> */}
                      <div className="kind">{project.name}</div>
                      <div className="">Quantity In Stock: {project.quantity} pcs</div>
                    {/* </div> */}
                  </Col>
                  <Col sm={8} md={2} className="mx-auto">
                    <div>
                      {/* need to add ARE YOU SURE logic to the deletion! */}
                      <Link to={{pathname: `/projects/${project.id}`, 
                      state: { 
                        currProject: project, 
                        allItems: props.items, 
                        currUser: props.currUser, 
                        toggleFavProj: props.onToggleFavProj, 
                        deleteThing: props.onDeleteThing 
                      }
                        }}>
                        {props.isSignedIn && <Button variant="outline-info" block>More Information</Button>}
                      </Link>
                    </div>
                  </Col>
              </Row>
            </Card>
          </div>
        ))}
    </div>
  );
}

export default Projects;

