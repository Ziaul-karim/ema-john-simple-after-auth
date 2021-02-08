import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'
import { Link } from 'react-router-dom';

const Product = (props) => {
    console.log(props.product)
    const{img, name, seller, price, stock, key} = props.product;
    const buttonIcon = <FontAwesomeIcon icon={faShoppingCart} />
    return (
        <div className = "product">
            <div>
                <img src={img} alt=""/>
            </div>
            <div>
                <h4 className = "product-name"><Link to={"/product/"+key}>{name}</Link></h4>
                <br/>
                <p><small>Key: {key}</small></p>
                <br/>
                <p><small>By : {seller}</small></p>
                <p>Price : {price}</p>
                <br/>
                <p><small>Only {stock} left in Stock. Order Soon</small></p>
                {props.showAddToCart && <button                 
                className="main-button"
                onClick = {() => props.handleAddProduct(props.product)}
                >
                    {buttonIcon} add to cart</button>}
            </div>
            
        </div>
    );
};

export default Product;