import { createContext, useState } from "react";


export const QuantityContext = createContext();

export const QuantityProvider = ({ children }) => {
    const [q, setQuantity] = useState(0);

    const addQuantity = (quantityToAdd) => {
        setQuantity(q + quantityToAdd);
    };

    const removeQuantity = (quantityToRemove) => {
        setQuantity(q - quantityToRemove);
    };

    return (
        <QuantityContext.Provider value={{ q, addQuantity, removeQuantity }}>
            {children}
        </QuantityContext.Provider>
    );
}
