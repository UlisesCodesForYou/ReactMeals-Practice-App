import { useContext, useEffect, useState } from "react";

import classes from "./HeaderCartButton.module.css";
import CartContext from "../../Store/Cart-context";
import CartIcon from "../Cart/CartIcon";

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false); // This dictates if the button per update is animated
  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (items.length === 0) {
      return; // This makes sure that if there are no items in the cart that the animation will not execute.
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false); // This resets the timer therefore updating the btnClasses back to an empty string, which will allow the animation to reset.
    }, 300);

    return () => {
      clearTimeout(timer); // This cleans up the timer above. Thus when the timer Func runs, it'll clear the timer
    }; // But if there are more that 1 item, the this button animation will run.
  }, [items]); //The dependency I have chosen is when the items in the array are updated only.  I pulled this out from the CartCtx object

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        {" "}
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
