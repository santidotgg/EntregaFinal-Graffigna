import { useEffect, useState} from "react";
import { IconButton, Button, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import Paginacion from "../Paginacion/Paginacion";


const Meli = () => {

    const [items, setItems] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setLoading] = useState(false);



    // useEffect(() => {
    //     fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`)
    //     .then((res) => res.json())
    //     .then((data) => setItems(data.results))
    //     .catch((err) => console.log(err));
    // }, []);
    
    const handleSearch = (e) => {
        e.preventDefault();
        setLoading(true);
        fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${input}`)
        .then((res) => res.json())
        .then((data) => setItems(data.results))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
    
    if (isLoading) {
        return <CircularProgress />
    }
    
    return (
        <div>
            <form onSubmit={handleSearch}>
            <TextField id="outlined-basic" label="Search" variant="outlined" value={input} onChange={(e) => setInput(e.target.value)}/>
            <Button type='submit' variant="contained" startIcon={<SearchIcon />}>Search</Button>
            </form>
        <h1>Meli</h1>
        <div>
            { items.map(item => {
                return (
                    <div key={item.id}>
                    <h2>{item.title}</h2>
                    <h3>$ {item.price}</h3>
                    <img src={item.thumbnail} alt={item.title} />
                    </div>
                )
            }) }
            
            <Paginacion />
        </div>
        </div>

    );
    }

export default Meli;