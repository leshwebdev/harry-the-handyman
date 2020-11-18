import React from "react";
import { Modal } from "react-bootstrap";

function Banner(props) {
    return (
      <Modal show={props.isBannerShown} onHide={props.onHideBanner}>
        <Modal.Body>{props.txt}</Modal.Body>
      </Modal>
    );
}

export default Banner;
