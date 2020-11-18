import React from "react";
import { Card, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function ItemDetails(props) {
// add +1 to the "popularity" of this project every time someone goes into this detail.
  const history = useHistory();
  const { name, description, cost, quantity, imgUrl } = props.location.state.currItem;
  return (
    <div className="container flex col">
      <h2>{name}</h2>
      <Card>
        <Card.Header>{description}</Card.Header>
        <Card.Body>
            <Card.Text>
              <div className="flex align-items-center">
                <Col sm={6} md={3}><Card.Img variant="top" className="item-img" src={imgUrl} /></Col>
                <Col sm={6} md={9}>
                  <div className="flex col">
                    <div className="">Cost: ${cost} ea.</div>
                    <div className="">Quantity In Stock: {quantity} pcs</div>
                  </div>
                </Col>
              </div>
            </Card.Text>
          <Button variant="primary" onClick={() => history.go(-1)}>Back</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ItemDetails;
