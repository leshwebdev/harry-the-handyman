import React, { useState, useEffect } from "react";
import Front from "../cmp/Front";
import Back from "../cmp/Back";
// import "../App.css";
import { Container, Row, Col } from "react-bootstrap";

function SignIn(props) {
  const [state, setState] = useState({
    typeIsSignIn: true,
    fields: {}
  });

  useEffect(() => {
    if (state.typeIsSignIn) {
      setState(state => ({ ...state, fields: { 
        username: {value:'', required: true, errors: []},
        password: {value:'', required: true, errors: []}}
       }));
    } else {
      setState(state => ({ ...state, fields: {
        username: {value:'', required: true, errors: []},
        fullName: {value:'', required: true, errors: []},
        email: {value:'', required: true, errors: []},
        password: {value:'', required: true, errors: []},
        passwordVerify: {value:'', required: true, errors: []}
      } }));
    }
  }, [state.typeIsSignIn])

  const changeType = () => {
    setState(state => ({ ...state, typeIsSignIn: !state.typeIsSignIn }))
  };

  return (
    <div>
      <Container className="" fluid>
        <Row className="my-2">
          <Col>
            {(state.typeIsSignIn) ?
            <Front type={state.typeIsSignIn} fields={state.fields} onSignIn={props.onSignIn} onChangeType={changeType} />
            : 
            <Back type={state.typeIsSignIn} fields={state.fields} onSignUp={props.onSignUp} onChangeType={changeType} />}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SignIn;
