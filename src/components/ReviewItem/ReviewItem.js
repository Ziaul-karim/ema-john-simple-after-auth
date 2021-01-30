import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity} = props.product
    console.log(props)
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
            <button className="main-button">Remove</button>
        </div>
    );
};

export default ReviewItem;