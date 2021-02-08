import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity, key, price} = props.product
    //console.log(props)
    const reviewItemStyle = {
        borderBottom: '1px solid lightgrey',
        marginBottom: '5px',
        paddingBottom: '5px',
        marginLeft: '200px'
    }
    return (
        <div style={reviewItemStyle}>
            <h3 className="product-name">{name}</h3>
            <p>Quantity: {quantity}</p>
            <br/>
            <p><small>Price: {price}</small></p>
            <br/>
            <button 
            onClick = {()=> props.removeProduct(key)}
            className="main-button"
            >Remove</button>
        </div>
    );
};

export default ReviewItem;