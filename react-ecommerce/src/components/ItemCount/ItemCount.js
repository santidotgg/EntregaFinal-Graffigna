import { useState } from "react"
import Button from "@mui/material/Button";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import './ItemCount.css'


const ItemCount = ({stock, onAdd}) => {
    const [count, setCount] = useState(1)

    const handleAdd = (e) => {
        e.preventDefault()
        if (count < stock) {
            setCount(count + 1)
        }
    }

    const handleSubstract = () => {
        if (count > 1) {
            setCount(count - 1)
        }
    }

    return (
        <div>
            <MenuItem>
            <div className="spacingAddRemove">
                <IconButton size="small" aria-label="Add or remov items to cart" color="inherit">
                    <RemoveRoundedIcon onClick={handleSubstract} />
                    <span className="itemCounter">{count}</span>
                    <AddRoundedIcon onClick={handleAdd} />
                </IconButton>
            <Button className="buttonSpacing" variant="contained" onClick={e => onAdd(count)}>Add to cart</Button>
            </div>
            </MenuItem>
        
        </div>
    )

}

export default ItemCount