import React from "react";
import { Row, Col, Image, Button } from "react-bootstrap";
import SignInOrUp from "./SignIn/pages/SignInOrUp";

function Home(props) {
    return (
      <div className="container flex col">
        <Row className="flex">
            <Col md={4} className="flex d-none d-md-block"><Image className="harry mx-auto" src="./img/common/harry.png" alt="" fluid/></Col>
            {!props.isSignedIn && <Col sm={12} md={6}><SignInOrUp onSignIn={props.onSignIn} onSignUp={props.onSignUp}/></Col>}
            {props.isSignedIn && <Col sm={12} md={6}>
              <div className='speech-bubble flex col'>
                <span>Hi {props.currUser.fullName.split(' ').shift()} !</span>
              </div>
              {!props.currUser.isAdmin && props.isSignedIn && <div className="hint">
                <div><span className="font-weight-bold">Hint:</span> For admin access, sign-in with:</div>
                <div>username: <span className="font-weight-bold">harry</span></div>
                <div>password: <span className="font-weight-bold">Harry123</span></div>
              </div>}
            </Col>}
        </Row>
      </div>
    );
}

export default Home;
