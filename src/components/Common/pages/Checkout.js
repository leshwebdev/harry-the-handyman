import React from "react";
import { Card, Table } from "react-bootstrap";

function Checkout(props) {
  const calcTotal = () => {
    let total = 0;
    props.items.forEach((item) => total += (props.onCalcCartQty(item.id) * item.cost))
    return total;
  }

  return (
    <div>
      <h2>Checkout:</h2>
      <Card>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Item</th>
              <th className="text-center">Price ea.</th>
              <th className="text-center">Quantity</th>
              <th className="text-center">sub-total</th>
            </tr>
          </thead>
          <tbody>
            {props.items.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td className="text-center">${item.cost}</td>
                <td className="text-center">{props.onCalcCartQty(item.id)}</td>
                <td className="text-center">${props.onCalcCartQty(item.id) * item.cost}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="3">Number of items:</td>
              <td className="text-center">{props.cartItems.reduce((sum, curItem) => sum + Object.values(curItem)[0], 0)}</td>
            </tr>
            <tr>
              <td colSpan="4">Total Cost:</td>
              <td className="text-center">${calcTotal()}</td>
            </tr>
          </tbody>
        </Table>
      </Card>
    </div>
  );
}

export default Checkout;
