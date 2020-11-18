import React, {useState, useEffect} from "react";
import { Card, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar} from '@fortawesome/free-regular-svg-icons';
import NecItems from "../cmp/NecItems";


function ProjectDetails(props) {
  const { id, name, description, instructions, quantity, imgUrl, necItemIds } = props.location.state.currProject;
  const { favProjects : currUserFavProjects } = props.location.state.currUser;
  const { toggleFavProj, deleteThing } = props.location.state;
  const { allItems } = props.location.state;
  const [state, setState] = useState({
    necItems: [],
    necItemNames: [],
    projectCost: null,
  });
  const history = useHistory();
  
  useEffect(() => { 
    function fetchNecItems() { 
      let necItems = [];
      for (let i = 0; i< necItemIds.length; i++){
        let match = allItems.find(item => {
          return item.id == necItemIds[i] 
        });
        necItems.push(match);
      }
      return necItems;
    }
    const necItems = fetchNecItems();
    const projCost = necItems.reduce((acc, num) => acc + num.cost, 0);
    setState(state => ({ ...state, necItems: necItems, projectCost: projCost }));
  }, [allItems, necItemIds, currUserFavProjects])

    return (
      <div className="container flex col">
      <h2 className="mb-2">{name}</h2>
      <Card>
        <Card.Header className="d-flex justify-content-between">
          {description}
          {props.location.state.currUser && <div onClick={() => toggleFavProj(id)} className="pointer">
            {(currUserFavProjects.includes(id)) ? <FontAwesomeIcon icon={fasStar} /> : <FontAwesomeIcon icon={farStar} />}
          </div>}
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <div className="flex align-items-center">
              <Col sm={3} md={3}>
                <Card.Img variant="top" className="item-img" src={imgUrl} />
              </Col>
              <Col sm={9} md={9}>
                <div className="flex col">
                  <div>Cost: <span className="font-weight-bold">${state.projectCost}</span></div>
                  <div>Quantity In Stock: <span className="font-weight-bold">{quantity} pcs</span></div>
                  {/* need to add "Instructions for the build" */}
                  {/* need to add "add all needed items to cart" functionality */}
                  <div><span className="font-weight-bold">Items required for the build:</span></div>
                  <NecItems items={state.necItems} />
                  <div className="mt-2">
                    <span className="font-weight-bold">Building Instructions:</span>
                    <p>{instructions}</p>
                  </div>
                </div>
              </Col>
            </div>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-between text-muted">
          <Button variant="primary" onClick={() => history.go(-1)}>Back</Button>
          {props.location.state.currUser && <Button variant="danger" onClick={() => deleteThing('projects', id)}>Delete Project</Button>}
        </Card.Footer>
      </Card>
    </div>
  );
}

export default ProjectDetails;