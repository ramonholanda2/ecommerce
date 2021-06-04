import React from 'react';

import { FiMenu } from 'react-icons/fi';
import { FiShoppingCart } from 'react-icons/fi';
import { useEcommerceContext } from '../../contexts/EcommerceContext';

import styles from './Header.module.scss'

const Header = () => {
    const { products } = useEcommerceContext();
    
    console.log(products)
    return (
        <div className={styles.header}>
            <div className={styles.img}>
                <img src="/imgs/commerce.png" alt="" />
            </div>
            <div className={styles.inpt}>
                <input type="text" placeholder='Search...' />
            </div>
            <div className={styles.options}>
                <div className={styles.btns}>
                    <button>
                        <FiShoppingCart size='2rem' />
                    </button>
                    <button>
                        <FiMenu size='2rem' />
                    </button>
                </div>
            </div>  
        </div>
    )
}

export default Header
