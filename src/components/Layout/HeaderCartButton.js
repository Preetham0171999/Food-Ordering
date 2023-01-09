import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";
import { useContext ,useEffect,useState} from "react";

const HeaderCartButton = (props) => {
    const [btnisHighlighted,setbtnisHighlighted]=useState(false);
  const ctx = useContext(CartContext);
  const{items}=ctx;

  const NumberofItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses =`${classes.button} ${btnisHighlighted? classes.bump:""}`;

  

  useEffect(()=>{
    if(items.length === 0){return;}
    setbtnisHighlighted(true);

  },[items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{NumberofItems}</span>
    </button>
  );
};

export default HeaderCartButton;
