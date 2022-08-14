import React from "react";
import "../assets/css/CheckoutProduct.css";
import { useStateValue } from "../ReactContextApi/StateProvider";

function CheckoutProduct({ id, title, image, price, rating , hideButton }) {
  const [ , dispatch] = useStateValue()
  const removeFromCart = () => {
    dispatch({
        type: 'REMOVE_FROM_CART' , 
        id: id
    }) 
  }

  return (
    <div className="checkoutProduct">
      <img src={image} className="checkoutProduct__image" alt="checkout banner" />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <small>$ </small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct__rating">
          {Array(rating)
            .fill()
            .map((element) => (
              <p>🌟</p>
            ))}
        </div>
        {!hideButton && <button onClick={removeFromCart}>Remove From Cart</button>}
      </div>
    </div>
  );
}

export default CheckoutProduct;
