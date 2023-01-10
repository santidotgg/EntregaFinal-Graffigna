import { createContext, useState } from "react";



export const CartContext = createContext();


export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    console.log(cart)
    const addItem = (itemToAdd) => {
        console.log(itemToAdd)
        console.log(isInCart(itemToAdd.id))
        if (!isInCart(itemToAdd.id)) {
            setCart([...cart, itemToAdd]);
        }
    };

    const isInCart = (id) => {
        return cart.some(item => item.id === id)
    }

    const getQuantity = () => {
        let total = 0;
        cart.forEach(item => {
            total += item.quantity
        })
        return total;
        }

    const removeItem = (id) => {
        const updatedCart = cart.filter(item => item.id !== id)
        setCart(updatedCart)
    }

    const getTotal = () => {
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity
        })
        return total;
    }

    const checkout = () => {
        setCart([])
    }

    const clearCart = () => {
        setCart([])
    }





    return (
            <CartContext.Provider value={{ cart, addItem, isInCart, getQuantity, removeItem, getTotal, clearCart}}>
                {children}
            </CartContext.Provider>
            )
    }

