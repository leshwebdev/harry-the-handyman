import React from "react";
import { Row, Col, Image } from "react-bootstrap";

function About(props) {
    return (
      <div className="container flex col">
        <Row className="flex">
          <Col>
            <div className="d-flex flex-column">
              <div className="d-flex">
                <Image className="harry about mx-auto" src="./img/common/harry.png" alt="" fluid/>
              </div>
            </div>
          </Col>
          <Col m={6}>
            <ul className="about-txt d-flex flex-column">
              <li><h2>This Single Page Application was developed in React JS.</h2>
              <h2>The frontend is served from GitHub Pages.</h2></li>
              <li><h2>The backend is handled by a lightweight Node.js instance, running the JSON-SERVER library, serving three collections (users, items, and projects).</h2>
              <h2>It runs on an ephemeral filesystem, which resets daily, and is hosted on Heroku.</h2></li>
              <li><h2>Libraries that were used in this SPA:</h2>
                <ul>
                  <li><h3>React-Router</h3></li>
                  <li><h3>Axios</h3></li>
                  <li><h3>React-Bootstrap</h3></li>
                  <li><h3>React-Transition-Group</h3></li>
                  <li><h3>Font-Awesome</h3></li>
                  <li><h3>React-Beautiful-DnD</h3></li>
                </ul>
              </li>
              <li><h2>APIs that were used in this SPA:</h2>
                <ul>
                  <li><h3>Robohash</h3></li>
                  <li><h3>Cloudinary</h3></li>
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
