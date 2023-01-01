import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { addDoc, collection, updateDoc, doc, getDocs, query, where, documentId, writeBatch} from 'firebase/firestore';
import { db } from '../../service/firebase/firebaseconfig';
import { TextField } from '@mui/material';
import Loading from '../Loading/Loading';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';


const Checkout = () => {

    const { cart, getTotal, clearCart} = useContext(CartContext);
    const [ loading, setLoading ] = useState(false);
    const navigate = useNavigate();


    const handleCrateOrder = async () => {
        setLoading(true);
        try {
        const objOrder = {
            buyer: {
                name: 'Juan',
                phone: '123456789',
                email: 'testing.mail@mail.com'
            },
            items: cart,
            total: getTotal()
        }
        const batch = writeBatch(db);

        const ids = cart.map((item) => item.id);
        const productsRef = query(collection(db, 'products'), where(documentId(), 'in', ids));
        const productsInCart = await getDocs(productsRef);
        const { docs } = productsInCart;
        const outOfStock = [];
        // const productsToUpdate = docs.map((doc) => {
        //     const item = cart.find((item) => item.id === doc.id);
        //     return {
        //         ...doc.data(),
        //         stock: doc.data().stock - item.quantity
        //     }
        // });
        docs.forEach(doc => {
            const dataDoc = doc.data();
            const stockDb = dataDoc.stock;
            const productAddedToCart = cart.find(item => item.id === doc.id);
            const cartQuantity = productAddedToCart?.quantity;

            if (stockDb >= cartQuantity) {
                batch.update(doc.ref, { stock: stockDb - cartQuantity });
            } else {
                outOfStock.push({ id: doc.id, ...dataDoc });
            }
        });

        if (outOfStock.length === 0) {
            await batch.commit();
            const orderRef = collection(db, 'orders');
            const orderAdded = await addDoc(orderRef, objOrder);
            console.log('Order created with ID: ', orderAdded.id);
            clearCart();
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } else {
            console.log('No hay stock suficiente');
        }

    } catch (error) {
        console.log(error);
    } finally {
        setLoading(false);
    }
    }


    if (loading) {
        return <Loading />
    }
    
    // const handleCrateOrder = () => {
    //     const objOrder = {
    //         buyer: {
    //             name: 'Juan',
    //             phone: '123456789',
    //             email: 'testing.mail@mail.com'
    //         },
    //         items: cart,
    //         total: getTotal()
    //     }
        
    //     const orderRef = collection(db, 'orders');
    //     addDoc(orderRef, objOrder)
    //     .then((response) => {
    //         console.log('Order created with ID: ', response.id);
    //         //console.log('Order created with ID: ', cart[0].id);
    //         // console log id from cart

    //     }
    //     )
    //     checkout()
    // }
    
    // const handleUpdateOrder = () => {
    //     const productRef = doc(db, 'products', cart[0].id);

    //     updateDoc(productRef, { stock:  cart[0].stock - cart[0].quantity})
    //     // .then((response) => {
    //     //     console.log('Order updated with ID: ', response.id);
    //     // }
    //     // )
    // }



    return (
        <div>
            <h1>Checkout</h1>
            <div className="checkout__container">
            <TextField id="outlined-basic" label="Name" variant="outlined" className='spacing' />
            <TextField id="outlined-basic" label="Phone" variant="outlined" className='spacing' />
            <TextField id="outlined-basic" label="Email" variant="outlined" className='spacing' />
            </div>
            

            <Button variant="contained" color="success" onClick={handleCrateOrder}>
                Confirm Order
            </Button>
        </div>
    )
}

export default Checkout