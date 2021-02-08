import React from 'react';


const Cart = (props) => {
    const cart = props.cart;
    const total = cart.reduce( (total, prod) => total + prod.price * prod.quantity, 0);
    //debugger;
    let shipping = 0;
    if(total > 100){
        shipping = 0;
    }else if(total > 50){
        shipping = 5.99
    }
    else if(total > 0){
        shipping = 12.99
    }

    const tax = (total / 10).toFixed(2);
    const grandTotal = (total + shipping + Number(tax)).toFixed(2);
     const formatNumber = num => {
         const precision = num.toFixed(2);
         return Number(precision)
     }
    return (
        <div>
            <h3>Cart Summary</h3>
            <p>Items Ordered: {cart.length}</p>
            <p>Product Price: {formatNumber(total)}</p>
            <p><small>Shipping Cost: {shipping} </small></p>
            <p><small>Tax: {tax}</small></p>
            <p>Total Price: {grandTotal}</p>
            {
                props.children
            }
        </div>
    );
};

export default Cart;