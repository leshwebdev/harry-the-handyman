import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import mainService from "../../Common/service/mainService";
import Users from "../cmp/Users";

function ManageUsers(props) {
  const history = useHistory();
  const [state, setState] = useState({
    users: [],
    bannerIsShown: false,
    msg: ""
  });

  const deleteUser = (param, id) => {
    if (id) {
        mainService.remove(param, id)
        .then((res) => reloadFromDB(param))
    } else {console.log('haha!')}
  }

  const reloadFromDB = async (param) => {
    const reloadedParam = await mainService.query(param)
    .then((results) => {
      const cleanRes = results.slice(1);
      setState(state => ({ ...state, [param]: cleanRes }))
  });
  }

  useEffect(() => {
    mainService.query('users')
    .then((results) => {
      const cleanRes = results.slice(1);
      setState(state => ({ ...state, users: cleanRes }))
    });
  }, [])

  return (

    <div className="container flex col">
      <h4>All Users</h4>
       <Card>
        <Card.Header><h4>As an admin, you can manage all the users here:</h4></Card.Header>
        <Card.Body>
          <Card.Text>
            <Row className="user-table-header">
              <Col xs={2} sm={2} md={2}></Col> 
              <Col xs={3} sm={3} md={3} classname="no-padding-left">Name</Col>
              <Col xs={2} sm={2} md={2}>Created</Col>
              <Col xs={2} sm={2} md={2}>Edit</Col>
              <Col xs={2} sm={2} md={2}>Remove</Col>
            </Row>
            <Row>
              <Col className="flex col">
                {state.users.map((user, index) => (
                  <div className="line mx-3" key={index}>
                    <Users user={user} onReloadFromDB={reloadFromDB} onDeleteUser={deleteUser} />
                    {/* <Users user={user} onEditUser={editUser} onDeleteUser={deleteUser} /> */}
                  </div>
                ))}
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

export default ManageUsers;
