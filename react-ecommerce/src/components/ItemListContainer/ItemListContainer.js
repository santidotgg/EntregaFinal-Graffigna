// import Meli from '../MockApi/Meli';
import { useState, useEffect } from 'react';
import { getProducts, getProductsByCategory } from '../MockProducts/MockProducts';
import ItemList from '../ItemList/ItemList';
import { useParams } from 'react-router-dom';
import './itemlistcontainer.css';
import Loading from '../Loading/Loading';
import { getDocs, collection, query, where, orderBy } from 'firebase/firestore';
import { db } from '../../service/firebase/firebaseconfig';

const ItemListContainer = ({ greeting }) => {

    //const [items, setItems] = useState([]);
    const [products, setProducts] = useState([]);
    const { categoryId } = useParams();
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     setLoading(true);
    //     if (categoryId) {
    //         getProductsByCategory(categoryId)
    //         .then(response => {
    //             setItems(response);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         })
    //         .finally(() => {
    //             setLoading(false);
    //         })
    //     }else {
    //     getProducts()
    //     .then(response => {
    //         setItems(response);
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     })
    //     .finally(() => {
    //         setLoading(false);
    //     })
    //     ;}

    // }, [categoryId]); // categoryId hay que ver si va o no

    useEffect(() => {
        setLoading(true);
        const collectionRef = categoryId ? query(collection(db, 'products'), where('category', '==', categoryId)) : query(collection(db, 'products'), orderBy('price'));
        getDocs(collectionRef).then((response) => {
            //console.log(response.docs);
            const productsAdapted = response.docs.map((doc) => {
                return { id: doc.id, ...doc.data() }
            })
            setProducts(productsAdapted);         
        }).catch((error) => {
            console.log('Error getting products: ', error);
        })
        .finally(() => {
            setLoading(false);
        }
        );



    }, [categoryId]);

    if (loading) {
        return <Loading />
    }


    return (
        <div>
            <h2 className="greetingFont">{greeting}</h2>
            <ItemList className='itemList' items={products} />
        
        {/* <Meli /> */}
        </div>
    );
    }

export default ItemListContainer;