import React, { useState, useEffect } from "react";
import { Card, Row, Col, Image, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import mainService from "../../Common/service/mainService";
import FavProject from "../../Project/cmp/FavProject";

function UserProfile(props) {
  const history = useHistory();
  const [state, setState] = useState({
    currUser: props.currUser,
    favProjects: [],
    bannerIsShown: false,
    msg: ""
  });

  useEffect(() => {
    let searchStr = '';
    if (props.currUser.favProjects.length > 0 ){
      props.currUser.favProjects.forEach(projId => searchStr+=`&id=${projId}`);
      const searchCropped = searchStr.substring(1);
      const str = `?${searchCropped}`;
      mainService.getById('projects', str)
      .then((results) => setState(state => ({ ...state, favProjects: results })));
    } else return
  }, [props.currUser.favProjects])

  return (
    <div className="container flex col">
      <h4>My Profile</h4>
       <Card>
        <Card.Header><h4>{state.currUser.fullName}</h4></Card.Header>
        <Card.Body>
          <Card.Text>
            <Row className="flex">
              <Col sm={3} md={2}><Image className="profile-pic" src={`https://robohash.org/set_set5/${state.currUser.fullName}.png`} alt="user pic" rounded /></Col>
              <Col sm={8} md={9} className="flex col">
                <div className="flex">
                  <div>Admin Status:</div>
                  <div className="mx-2">
                    {(state.currUser.isAdmin)? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} />}
                  </div>
                </div>
                <div className="flex">
                  {`Favorite Projects: `}
                  <div className="d-flex flex-column">
                    {(state.favProjects.length > 0) ? state.favProjects.map((project, index) => (<FavProject key={index} project={project} />)): "none"}
                  </div>
                </div>
              </Col>
            </Row>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
          <Button variant="primary" onClick={() => history.go(-1)}>Back</Button>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default UserProfile;
