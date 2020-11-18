import React, { useState, useEffect } from "react";
import { Form, Col, Button } from "react-bootstrap";
import ErrMsg from '../../Common/cmp/ErrMsg';
import Banner from "../../Common/cmp/Banner";
import validate from '../../Common/service/validate';

function UserForm(props) {
  const [state, setState] = useState({
    field: {},
    bannerIsShown: false,
    msg: ""
  });

  useEffect(() => {
    setState(state => ({ ...state, field: props.fields}));
  }, [props.fields])

  const onInputChange = (e) => {
    const errors = validate(e.target, state) ;
    setState({...state, field : {
      ...state.field, [e.target.name] : {
        ...state.field[e.target.name], value : e.target.value, errors
        }
      }
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(state.field).every((k) => state.field[k].errors.length === 0)) {
      if (props.typeIsSignIn) {
        props.onSignIn(state.field);
      } else { 
        props.onSignUp(state.field); 
        setState((state) => ({ ...state, msg : `Thanks for signing up, ${state.field.fullName.value.split(' ').shift()}`, bannerIsShown: true }));
      }
    } else { 
      setState((state) => ({ ...state, msg: 'Some of the fields have issues.', bannerIsShown: true }));
    }
  };
  
  const bannerHide = () => setState((state) => ({ ...state, bannerIsShown : false }));
  const bannerShow = () => setState((state) => ({ ...state, bannerIsShown : true }));

  if (props.typeIsSignIn) {
    return (
      <div>
      <Form className="form" onSubmit={onSubmit}>
        <Form.Row>
          <Col className="form-field flex">
            <Form.Control className="mb-2" type="text" placeholder="Enter Username" name="username" id="usernameSI" onBlur={onInputChange} />
            {state.field.username && state.field.username.errors.length > 0 && <ErrMsg errors={state.field.username.errors} />}
          </Col>
        </Form.Row>
        <Form.Row>
          <Col className="form-field flex">
            <Form.Control className="mb-2" type="password" placeholder="Enter Password" name="password" id="passwordSI" onChange={onInputChange} />
            {state.field.password && state.field.password.errors.length > 0 && <ErrMsg errors={state.field.password.errors} />}
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Button block type="submit">
              Sign In
            </Button>
          </Col>
        </Form.Row>
      </Form>
      <Banner isBannerShown={state.bannerIsShown} onShowBanner={bannerShow} onHideBanner={bannerHide} txt={state.msg} />
    </div>
    );
  } else {
    return (
      <div>
      <Form className="form" onSubmit={onSubmit}>
        <Form.Row>
          <Col className="form-field flex">
            <Form.Control className="mb-2" type="text" placeholder="Enter Username" name="username" id="usernameSU" onBlur={onInputChange} />
            {state.field.username && state.field.username.errors.length > 0 && <ErrMsg errors={state.field.username.errors} />}
          </Col>
        </Form.Row>
        <Form.Row>
          <Col className="form-field flex">
            <Form.Control className="mb-2" type="text" placeholder="Enter Your Full Name" name="fullName" id="fullName" onBlur={onInputChange} />
            {state.field.fullName && state.field.fullName.errors.length > 0 && <ErrMsg errors={state.field.fullName.errors} />}
          </Col>
        </Form.Row>
        <Form.Row>
          <Col className="form-field flex">
            <Form.Control className="mb-2" type="text" placeholder="Enter Email" name="email" id="email" onBlur={onInputChange} />
            {state.field.email && state.field.email.errors.length > 0 && <ErrMsg errors={state.field.email.errors} />}
          </Col>
        </Form.Row>
        <Form.Row>
          <Col className="form-field flex">
            <Form.Control className="mb-2" type="password" placeholder="Enter Password" name="password" id="passwordSU" onBlur={onInputChange} />
            {state.field.password && state.field.password.errors.length > 0 && <ErrMsg errors={state.field.password.errors} />}
          </Col>
        </Form.Row>
        <Form.Row>
          <Col className="form-field flex">
            <Form.Control className="mb-2" type="password" placeholder="Re-enter Password" name="passwordVerify" id="passwordVerify" onBlur={onInputChange} />
            {state.field.passwordVerify && state.field.passwordVerify.errors.length > 0 && <ErrMsg errors={state.field.passwordVerify.errors} />}
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Button block type="submit">
              Sign Up
            </Button>
          </Col>
        </Form.Row>
      </Form>
      <Banner isBannerShown={state.bannerIsShown} onShowBanner={bannerShow} onHideBanner={bannerHide} txt={state.msg} />
    </div>
    );
  }
}

export default UserForm;
