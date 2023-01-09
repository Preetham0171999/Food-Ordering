import React from "react";


const CartContext=React.createContext({
    items:[],
    additem:(item)=>{},
    removeItem:(id)=>{}

})

export default CartContext;