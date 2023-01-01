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

// const CartProvider = ({ children }) => {
//     const [cart, setCart] = useState([]);
//     const [total, setTotal] = useState(0);
    
//     const addCart = (itemToAdd) => {
//         if (!isInCart(itemToAdd.id)) {
//         setCart([...cart, itemToAdd]);
//         }
//     };
    
//     const isInCart = (id) => {
//         return cart.some(cart => cart.id === id)
//     }
    
//     const removeCart = (id) => {
//         setCart(cart.filter(cart => cart.id !== id))
//     }
    
//     const clearCart = () => {
//         setCart([])
//     }
    
//     const getTotal = () => {
//         let total = 0;
//         cart.forEach(item => {
//         total += item.price
//         })
//         setTotal(total)
//     }
    
//     return (
//         <CartContext.Provider value={{ cart, addCart, removeCart, clearCart, total, getTotal }}>
//         {children}
//         </CartContext.Provider>
//     )
//     }