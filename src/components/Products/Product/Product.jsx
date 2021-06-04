import React from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import styles from './Product.module.scss';

const Product = ({ product }) => {

    return (
        <div className={styles.productDetails}>
            <div className={styles.product}>
                <h3>{product.data.name}</h3>
                <img src={product.data.image} alt={product.data.name} />
            </div>

            <div className={styles.buyProduct}>
                <div className={styles.buy}>
                    <span>Preço: {String(product.data.price).replace('.', ',')} R$</span>
                    <button>Comprar</button>
                </div>
                <div className={styles.addCart}>
                    <span>Adicionar ao carrinho</span>
                    <button className={styles.cart}>
                        <MdAddShoppingCart size='1.3rem' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Product
