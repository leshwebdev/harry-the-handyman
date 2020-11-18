import React from "react";
import { Link } from 'react-router-dom'

import { Card, Container, Row, Col, Button } from "react-bootstrap";

function Items(props) {
  return (
    <div className="container flex col">
      <h2>Items:</h2>
        {props.items.map((item, index) => (
          <div className="mx-3" key={index}>
            <Card className="mt-3 p-3">
              <Row className="align-items-center">
                <Col sm={12} md={2}><img className="item-img" src={item.imgUrl} alt="" /></Col>
                <Col sm={12} md={6} className="mx-5">
                  <div className="kind">{item.name}</div>
                  <div>Cost: ${item.cost} ea.</div>
                  <div>Quantity in Stock: {item.quantity} pcs</div>
                </Col>
                <Col sm={12} md={2}>
                  <div>
                    <Link to={{pathname: `/items/${item.id}`, state: { currItem: item, onAddToCart: props.onAddToCart }}}>
                      <Button variant="outline-info" className="my-1" block>Details</Button>
                    </Link>
                  </div>
                  <div>
                    <Button variant="primary" className="my-1" onClick={() => props.onAddToCart(item)} block>Add To Cart</Button>
                  </div>
                </Col>
              </Row>
            </Card>
          </div>
        ))}
    </div>
  );
}

export default Items;


 {/* TODOS:
                  add a "recommended for ??? projects". 
                  add buttons for "add to cart" inside this page */}