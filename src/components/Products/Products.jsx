import React, { useEffect } from 'react';
import { useEcommerceContext } from '../../contexts/EcommerceContext';
import { useHistory } from 'react-router-dom';
import Product from './Product/Product'
import styles from './Products.module.scss';
import { auth } from '../../api/firebase';

const Products = () => {
    const { products, user, loading } = useEcommerceContext();
    const history = useHistory();

    function logout() {
        auth.signOut();
        history.push('/login')
    }

    useEffect(() => {
        console.log(user)
        if(!user && !loading) {
            history.push('/login');
        }
    }, [history, loading, user])

    if(!products) return <img className={styles.loading} src="/imgs/loading.gif" alt="Loading..." /> 

    return (
        <div className={styles.products}>
            {products.map((product) => (
                <Product key={product.id} product={product} />
            ))}
            <h1 onClick={logout}>sair</h1>
        </div>
    )
}

export default Products
