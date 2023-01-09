import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import React, { useContext } from "react";
import CartContext from "../../../store/cart-context";

const MealItem = (props) => {
  const ctx = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;

  const AddtoCartHandler = (amount) => {
    ctx.additem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <h3 className={classes.description}>{props.description}</h3>
        <h3 className={classes.price}>{price}</h3>
      </div>
      <div>
        <MealItemForm onAddToCart={AddtoCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
