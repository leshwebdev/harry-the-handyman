import React from "react";
import { Form, InputGroup, Row, Col, Image, Button } from "react-bootstrap";
import ErrMsg from '../../Common/cmp/ErrMsg';

function UserEdit(props) {
  const {
    fullName: {value: fullNameVal, errors: fullNameErrs}, 
    username: {value: usernameVal, errors: usernameErrs}, 
    password: {value: passwordVal, errors: passwordErrs}, 
    email: {value: emailVal, errors: emailsErrs},
    isAdmin: {value: isAdminVal, errors: isAdminErrs},
  } = props.user;
  
  return (
      <Row>
        <Form className="form edit-user mt-4 mx-auto" onSubmit={props.onSubmitChanges}>
        <Form.Row>
          <Col className="form-field">
            <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <span>Username</span>
                  </InputGroup.Text>
                </InputGroup.Prepend>
              <Form.Control type="text" placeholder={usernameVal} name="username" id="usernameSU" onChange={props.onFieldUpdate} />
            {usernameVal && usernameErrs.length > 0 && <ErrMsg userUpdate={true} errors={usernameErrs} />}
            </InputGroup>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col className="form-field">
            <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <span>Full Name</span>
                  </InputGroup.Text>
                </InputGroup.Prepend>
              <Form.Control type="text" placeholder={fullNameVal} name="fullName" id="fullName" onChange={props.onFieldUpdate} />
              {fullNameVal && fullNameErrs.length > 0 && <ErrMsg userUpdate={true} errors={fullNameErrs} />}
            </InputGroup>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col className="form-field">
            <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                  <span>E-mail</span>
                  </InputGroup.Text>
                </InputGroup.Prepend>
              <Form.Control type="text" placeholder={emailVal} name="email" id="email" onChange={props.onFieldUpdate} />
              {emailVal && emailsErrs.length > 0 && <ErrMsg userUpdate={true} errors={emailsErrs} />}
            </InputGroup>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col className="form-field">
            <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                  <span>Password</span>
                  </InputGroup.Text>
                </InputGroup.Prepend>
              <Form.Control type="password" placeholder={passwordVal} name="password" id="password" onChange={props.onFieldUpdate} />
              <InputGroup.Append>
                {passwordVal && passwordErrs.length > 0 && <ErrMsg userUpdate={true} errors={passwordErrs} />}
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Form.Row>
        {/* <Form.Row>
          <Col className="form-field">
            <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                  <span>isAdmin</span>
                  </InputGroup.Text>
                </InputGroup.Prepend>
              <Form.Control type="checkbox" placeholder={isAdminVal} name="isAdmin" id="isAdmin" onChange={props.onFieldUpdate} />
              <InputGroup.Append>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Form.Row> */}
        <Form.Row>
          <Col>
            <Button block type="submit">
              Save
            </Button>
          </Col>
        </Form.Row>
      </Form>
    </Row>
    );
}

export default UserEdit;
