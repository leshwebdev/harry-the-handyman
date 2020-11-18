import React, { useState } from 'react';
import { Form, InputGroup, Col, Image, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import imgService from '../../Common/service/imgService';
import DnDItems from "../cmp/DnDItems";
import ErrMsg from '../../Common/cmp/ErrMsg';
import Banner from '../../Common/cmp/Banner';
import validate from '../../Common/service/validate';

function NewProjectForm(props) {
  const [state, setState] = useState({
    field: {
      projName: {value:'', required: true, errors: []},
      projDesc: {value:'', required: false},
      projInst: {value:'', required: false},
      qty: {value: 0, required: false},
      img: {value: '', required: false, errors: []},
      necItems: {value: '', required: false, errors: []}
    },
    bannerIsShown: false,
    msg: ""
  });

  const onInputChange = (e) => {
    const errors = validate(e.target, state) ;
    setState({...state, field : {
      ...state.field, [e.target.name] : {
        ...state.field[e.target.name], value : e.target.value, errors
        }
      }
    })
  }

  const updateNecItems = (items) => {
    const necItemIds = items.map(item => item.id)
    setState((state) => ({...state, field: {...state.field, necItems : {...state.field.necItems, value: necItemIds }}}));
  }

  const getImgUrl = (ev) => {
    if (ev) {
      setState((state) => ({ ...state, msg:
        <div className="d-flex align-items-center justify-content-around">
          <div>Your Image Is Being Uploaded</div>
          <div><Image src="./img/common/loader.gif" alt="" /></div>
        </div>, 
         bannerIsShown: true }));
      imgService.uploadImg(ev)
      .then(res => {
        setState((state) => ({...state, field: {...state.field, img : {...state.field.img, value: res }}}));
        setState((state) => ({...state, msg : '', bannerIsShown: false}));
    });
    } else { console.log('hee haw!')}
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(state.field).every((k) => state.field[k].errors.length === 0)) {
      setState((state) => ({ ...state, msg:
        <div className="d-flex align-items-center justify-content-around">
          <div>Thanks For Submitting a New Project !</div>
          <div><Image src="./img/common/loader.gif" alt="" /></div>
        </div>, 
         bannerIsShown: true }));
      props.onAddThing('projects', state.field);
    } else { 
      setState((state) => ({ ...state, msg: 'Some of the fields have issues.', bannerIsShown: true }));
    }
  };
  
  const bannerHide = () => setState((state) => ({ ...state, bannerIsShown : false }));
  const bannerShow = () => setState((state) => ({ ...state, bannerIsShown : true }));

    return (
      <div>
        <Form className="form" onSubmit={onSubmit}>
          <Form.Row>
            <Col sm={10} md={10}>
              <Form.Control className="mb-2" type="text" placeholder="Enter Project Name" name="projName" id="projName" onBlur={onInputChange} />
              {state.field.projName.errors.length > 0 && <ErrMsg errors={state.field.projName.errors} />}
            </Col>
            <Col sm={1} md={1}>
              <Form.Control className="mb-2" type="number" placeholder="Stock" name="qty" id="qty" onBlur={onInputChange} />
            </Col>
            <Col sm={1} md={1}>
              <InputGroup>
                  <InputGroup.Text  className="custom-file-upload">
                    <label for="img" className="pointer">
                      <FontAwesomeIcon icon={faUpload} />
                    </label>
                  </InputGroup.Text>
                <Form.Control className="mb-2" type="file" placeholder="Upload a Picture" name="img" id="img" onChange={getImgUrl} />
              </InputGroup>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Control className="mb-2" type="text" placeholder="Enter The Project Description" name="projDesc" id="projDesc" onBlur={onInputChange} />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Control className="mb-2" as="textarea" rows={3} placeholder="Instructions for Building This Project" name="projInst" id="projInst" onBlur={onInputChange} />
            </Col>
          </Form.Row>
          {/* <Form.Row>
            
          </Form.Row> */}
          <Form.Row className="d-flex flex-column">
            <Col>
              <DnDItems items={props.items} onUpdateNecItems={updateNecItems}/>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Button block type="submit">Submit new Project</Button>
            </Col>
          </Form.Row>
        </Form>
        <Banner isBannerShown={state.bannerIsShown} onShowBanner={bannerShow} onHideBanner={bannerHide} txt={state.msg} />
      </div>
    )
}

export default NewProjectForm;
