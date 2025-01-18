import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const { currency, delivery_fee } = useContext(ShopContext);

  return (
    <section className="cart-total">
      <div className="cart-total__body">
        <Title text1="CART " text2="TOTALS" />
        <div className="cart-totals__info">
          <div className="info__item">
            <div className="info__name">Subtotal</div>
            <div className="info__price">{currency}60</div>
          </div>
          <div className="info__item">
            <div className="info__name">Shipping Fee</div>
            <div className="info__price">
              {currency} {delivery_fee}
            </div>
          </div>
          <div className="info__item">
            <div className="info__name">
              <b>Total</b>
            </div>
            <div className="info__price">{currency} 70</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartTotal;
