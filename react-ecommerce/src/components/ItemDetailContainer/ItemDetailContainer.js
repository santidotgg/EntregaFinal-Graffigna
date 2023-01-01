import { useState ,useEffect } from 'react';
import { getProductById } from '../MockProducts/MockProducts';
import { useParams } from 'react-router-dom';
import * as React from 'react';
import Container from '@mui/material/Container';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import { Button, CardActionArea, CardActions } from '@mui/material';
// import ItemCount from '../ItemCount/ItemCount';
import ItemDetail from '../ItemDetail/ItemDetail';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../service/firebase/firebaseconfig';
import Loading from '../Loading/Loading';



const ItemDetailContainer = () => {

    const [item, setItem] = useState({});
    const { itemId } = useParams();
    const [loading, setLoading] = useState(true);


    // useEffect(() => {
    //     getProductById(itemId)
    //     .then(response => {
    //         setItem(response);
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     });
    // }, [itemId]);


    useEffect(() => {
        setLoading(true);
        const docRef = doc(db, 'products', itemId);
        getDoc(docRef).then((response) => {
            if (response.exists()) {
                setItem({ id: response.id, ...response.data() });
            } else {
                console.log('No such item!');
            }
        }).catch((error) => {
            console.log('Error getting item:', error);
        }).finally(() => {
            setLoading(false);
        });
        
    }, [itemId]);

    if (loading) {
        return <Loading />
    }


    return (
        <div>

          <h2>Item Detail</h2>
            <Container maxWidth="xs">
            <ItemDetail {...item}/>
            </Container>
        </div>
    )
}


export default ItemDetailContainer;