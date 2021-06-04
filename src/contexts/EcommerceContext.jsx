import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, auth } from '../api/firebase';

export const EcommerceContext = createContext();

export const EcommerceContextProvider = ({ children }) => {
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // pegar dados do usuário
        auth.onAuthStateChanged(user => {
            setUser(user);
            setLoading(false);
        });

        // pegar dados dos produtos
        db.collection('products').onSnapshot((snapshot) => {
            setProducts(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        });

    }, []);

    return (
        <EcommerceContext.Provider
         value={{
            user,
            products,
            loading
         }}
        >
            { children }
        </EcommerceContext.Provider>
    )
}
export const useEcommerceContext = () => {
    return useContext(EcommerceContext);
}

