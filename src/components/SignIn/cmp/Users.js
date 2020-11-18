import React, {useState} from "react";
import { Row, Col, Image } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import mainService from "../../Common/service/mainService";
import validate from '../../Common/service/validate';
import UserEdit from '../../SignIn/cmp/UserEdit';
import Banner from '../../Common/cmp/Banner';



function Users(props) {
  const {id, username, isAdmin, fullName, email, password, cart, favProjects, updatedOn} = props.user;
  const [state, setState] = useState({
    field: {
      id: {value: id, required: false, errors: []},
      username: {value: username, required: true, errors: []},
      isAdmin: {value: isAdmin, required: false, errors: []},
      fullName: {value: fullName, required: true, errors: []},
      email: {value: email, required: true, errors: []},
      password: {value: password, required: true, errors: []},
      cart: {value: cart, required: false, errors: []},
      favProjects: {value: favProjects, required: false, errors: []}
      // passwordVerify: {value:'', required: false, errors: []}
    },
    isEditingUser: false,
    bannerIsShown: false,
    msg: ""
  });

  const editUser = () => {
    setState(state => ({ ...state, isEditingUser: !state.isEditingUser }))
  }

  const onFieldUpdate = (e) => {
    const errors = validate(e.target, state) ;
    setState({...state, field : {
      ...state.field, [e.target.name] : {
        ...state.field[e.target.name], value : e.target.value, errors
        }
      }
    })
  }

  const onSubmitChanges = (e) => {
    e.preventDefault();
    if (Object.keys(state.field).every((k) => state.field[k].errors.length === 0)) {
      saveChangesToDB(state.field); 
      setState((state) => ({ ...state, msg : `User: "${state.field.username.value}" has been updated.`, bannerIsShown: true }));
      setTimeout(() => {
        props.onReloadFromDB('users');
        setState(state => ({ ...state, isEditingUser: !state.isEditingUser, bannerIsShown: false }));
      }, 2000);
    } else { 
      setState((state) => ({ ...state, msg: 'Some of the fields have issues.', bannerIsShown: true }));
    }
  };

  const saveChangesToDB = (details) => {
    const {
      id: {value: idVal}, 
      fullName: {value: fullNameVal}, 
      username: {value: usernameVal}, 
      isAdmin: {value: isAdminVal}, 
      password: {value: passwordVal}, 
      email: {value: emailVal},
      cart: {value: cartVal},
      favProjects: {value: favProjectsVal}
    } = details;
    const updatedUser = {
      id: idVal, 
      fullName: fullNameVal, 
      username: usernameVal, 
      isAdmin: isAdminVal, 
      password: passwordVal, 
      email: emailVal,
      cart: cartVal,
      favProjects: favProjectsVal
    };
    mainService.save("users", updatedUser)
    .then((result) => result);
  }

  const bannerHide = () => setState((state) => ({ ...state, bannerIsShown : false }));
  const bannerShow = () => setState((state) => ({ ...state, bannerIsShown : true }));

  return (
    <div>
      <Row className="flex align-items-center">
        <Col sm={2} md={2}><Image className="avatar mngusers" src={`https://robohash.org/set_set5/${fullName}.png`} alt="user pic" roundedCircle /></Col>
        <Col sm={3} md={3}>{fullName}</Col>
        <Col sm={2} md={2}>{moment(updatedOn).fromNow()}</Col>
        <Col sm={2} md={2}><FontAwesomeIcon className="pointer" icon={faEdit} onClick={() => editUser()}/></Col>
        <Col sm={2} md={2}><FontAwesomeIcon className="pointer" icon={faTimes} onClick={() => props.onDeleteUser('users', id)} /></Col>
      </Row>
      {(state.isEditingUser) && <UserEdit user={state.field} onSubmitChanges={onSubmitChanges} onFieldUpdate={onFieldUpdate}/>}
      <Banner isBannerShown={state.bannerIsShown} onShowBanner={bannerShow} onHideBanner={bannerHide} txt={state.msg} />
    </div>
    );
}

export default Users;
