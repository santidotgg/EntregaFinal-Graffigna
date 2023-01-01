import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const CartWidget = () => {
    const { getQuantity } = useContext(CartContext);
    const totalQuantity = getQuantity();

    return (
        <MenuItem>
        <IconButton size="large" aria-label="items added to shopping cart" color="inherit">
          <Badge badgeContent={totalQuantity} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </MenuItem>
    );
};

export default CartWidget;