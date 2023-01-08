import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import ItemCount from '../ItemCount/ItemCount';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import Button from "@mui/material/Button";
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { NotificationContext } from '../../context/NotificationContext';


const ItemDetail = ({ id, title, pictureUrl, description, price, stock }) => {

    const [quantityToAdd, setQuantityToAdd] = useState(0);

    const { addItem, isInCart, removeItem } = useContext(CartContext);
    const { setNotification } = useContext(NotificationContext);

    const handleOnAdd = (quantity) => {
        console.log(quantity);
        setQuantityToAdd(quantity);
        addItem({id, title, pictureUrl, price, stock, quantity });
        setNotification(`Product added to cart`, 'success');
        //addItem({id, title, pictureUrl, price, stock, quantityToAdd });
    }




    const isAdded = isInCart(id);

    const handleRemove = () => {
        removeItem(id);
        setQuantityToAdd(0);
        setNotification('Product removed from cart', 'info');
        
    }


    return (
        <div> 
            <Card sx={{ maxWidth: 345, background: 'black', color:'white'}} >
            <CardActionArea>
                <CardMedia
                component="img"
                height="auto"
                image={pictureUrl}
                alt={title}
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2">
                    {description}
                </Typography>
                <Typography variant="body2">
                $ {price}
                </Typography>
                <Typography variant="body2">
                    {stock > 0 ? <ItemCount stock={stock} initial={1} onAdd={handleOnAdd}/> : 'OUT OF STOCK!' }
                    {quantityToAdd > 0 ? `${quantityToAdd} added to cart` : ''}
                </Typography>
                <Typography variant='body2'>
                    {quantityToAdd >= 1 ? <Link to='/cart'><button>Checkout</button></Link> : ''}

                </Typography>
                <Typography variant='body2'>
                    {isAdded ? <button onClick={handleRemove}>Remove from cart</button> : ''}
                </Typography>

                </CardContent>
            </CardActionArea>
            </Card>
        </div>
    )
   
}


export default ItemDetail;