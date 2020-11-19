import React from "react";
import { Row, Col, Image } from "react-bootstrap";

function About(props) {
    return (
      <div className="container flex col">
        <Row className="flex">
          <Col md={4} className="flex d-none d-md-block">
            <div className="d-flex flex-column">
              <div className="d-flex">
                <Image className="harry about mx-auto" src="./img/common/harry.png" alt="" fluid/>
              </div>
            </div>
          </Col>
          <Col sm={12} md={8}>
            <ul className="about-txt d-flex flex-column">
              <li>
                <h3>This Single Page Application was developed in React JS.</h3>
                <h3>The frontend is served from GitHub Pages.</h3>
              </li>
              <li>
                <h3>The backend is handled by a lightweight Node.js instance, running the JSON-SERVER library, serving three collections (users, items, and projects).</h3>
                <h3>It runs on an ephemeral filesystem, which resets daily, and is hosted on Heroku.</h3>
              </li>
              <li>
                <h3>Libraries that were used in this SPA:</h3>
                <ul>
                  <li><h4>React-Router</h4></li>
                  <li><h4>Axios</h4></li>
                  <li><h4>React-Bootstrap</h4></li>
                  <li><h4>React-Transition-Group</h4></li>
                  <li><h4>Font-Awesome</h4></li>
                  <li><h4>React-Beautiful-DnD</h4></li>
                </ul>
              </li>
              <li>
                <h3>APIs that were used in this SPA:</h3>
                <ul>
                  <li><h4>Robohash</h4></li>
                  <li><h4>Cloudinary</h4></li>
                </ul>
              </li>
            </ul>
          </Col>
        </Row>
        <Row>
          <h4 className="mx-auto">Ohad Leshem, 2020</h4>
        </Row>
    </div>
  );
}

export default About;
