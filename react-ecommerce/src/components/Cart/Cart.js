import { CartContext } from "../../context/CartContext";
import { useContext } from "react";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";


const Cart = () => {

    const { cart, removeItem, getTotal, clearCart} = useContext(CartContext);


    return (
        <div>
            <h1>Cart</h1> 
            {cart.length > 0 ? <button onClick={clearCart}>Clear Cart</button> : <p>Cart is empty</p>}
            <ul>
                {cart.map((item) => (
                    <li key={item.id}>
                        <p>{item.title}</p>
                        <p>{item.price}</p>
                        <p>{item.quantity}</p>
                        <p>$ {item.price * item.quantity}</p>
                        <button onClick={() => removeItem(item.id)}>Remove Item</button>
                    </li>
                ))}
            </ul>
                {cart.length > 0 && <h2>Total: $ {getTotal()}</h2>}
            {cart.length > 0 ?
            <Link to={'/checkout'}><Button variant="contained">Checkout</Button> </Link>
            : ''}
            
        </div>
    );
}

export default Cart;

