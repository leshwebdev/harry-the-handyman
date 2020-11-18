import React, { useState, useEffect } from "react";
import { Card, Table, Button } from "react-bootstrap";
import Checkout from "../../Common/pages/Checkout";
import Banner from "../../Common/cmp/Banner";
import mainService from "../../Common/service/mainService";

function Cart(props) {
  const [state, setState] = useState({
    items: [],
    bannerIsShown: false,
    msg: ""
  });

  useEffect(() => {
    let searchStr = '';
    if (props.items.length > 0 ){
      props.items.forEach(item => searchStr+=`&id=${Object.keys(item)[0]}`);
      const searchCropped = searchStr.substring(1);
      const str = `?${searchCropped}`;
      mainService.getById('items', str)
      .then((results) => setState(state => ({ ...state, items: results })));
    } else return
  }, [props.items])

  const calcCartQty = (itemId) => {
    const cartItem = props.items.find(cartItem => Object.keys(cartItem)[0] === itemId);
    if (cartItem) {
      const cartItemQty = Object.values(cartItem)[0];
      return cartItemQty;
    } else console.log('haha!')
  }

  const checkout = () => {
    setState((state) => ({ ...state, msg : <Checkout items={state.items} cartItems={props.items} onCalcCartQty={calcCartQty}/> }));
    setState((state) => ({ ...state, bannerIsShown: true }));
  }

  const bannerHide = () => setState((state) => ({ ...state, bannerIsShown : false }));
  const bannerShow = () => setState((state) => ({ ...state, bannerIsShown : true }));

  return (
    <div className="container flex col">
      <h2>Cart:</h2>
      <Card className="p-2">
        <Table striped bordered>
          <thead>
            <tr>
              <th colSpan="2">Item</th>
              <th>Price</th>
              <th colSpan="2">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {state.items.map((item, index) => (
              <tr key={index}>
                <td><img className="cart-item-img" src={item.imgUrl} alt="" /></td>
                <td>{item.name}</td>
                <td>${item.cost}</td>
                <td>{calcCartQty(item.id)}</td>
                <td className="remove" onClick={() => props.onRemoveFromCart(item)}>x</td> 
                {/* TODO: to actually get thes removeFromCart working properly ! */}
              </tr>
            ))}
          </tbody>
        </Table>
        {state.items.length > 0 && <Button onClick={() => checkout()}>Place Order</Button>}
      </Card>
      <Banner isBannerShown={state.bannerIsShown} onShowBanner={bannerShow} onHideBanner={bannerHide} txt={state.msg} />
    </div>
  );
}

export default Cart;