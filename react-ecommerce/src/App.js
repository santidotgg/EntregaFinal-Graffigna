import './App.css';
import Navbar from './components/Navbar/Navbar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
// import Meli from './components/MockApi/Meli';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createContext } from 'react';
import { CartProvider } from './context/CartContext';
import Cart from './components/Cart/Cart';
import { NotificationProvider } from './context/NotificationContext';
import Checkout from './components/Checkout/Checkout';

export const CartContext = createContext();
//coso
function App() {
  
  return (
    <div className="App">
      <CartProvider>
        <NotificationProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>

            <Route path="/" element={<ItemListContainer greeting="Welcome Back!" />} /> {/* se encarga de obtener datos para listar */}
            <Route path="/category/:categoryId" element={<ItemListContainer greeting="Welcome Back!" />} />
            <Route path="/item/:itemId" element={<ItemDetailContainer />} /> {/* detalle de un producto*/}
            <Route path="/cart" element={<Cart />} />
            <Route path='/checkout' element={<Checkout />} />

          </Routes>
        </BrowserRouter>
        </NotificationProvider>
      </CartProvider>

      {/* <ItemListContainer greeting="Welcome Back!" /> */}
      {/* <Meli /> */}
    </div>
  );
}

export default App;
