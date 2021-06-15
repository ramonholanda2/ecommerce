import React from "react";
import { Link, useHistory } from "react-router-dom";
import { BiArrowBack } from 'react-icons/bi';

import ProductsToCart from "./ProductsToCart/ProductsToCart";

import { useEcommerceContext } from "../../contexts/EcommerceContext";

import styles from "./Cart.module.scss";

const Cart = () => {
  const history = useHistory();
  const { productsToCart, valueTotalToCart } = useEcommerceContext();

  if (!productsToCart) return <h1>Loading...</h1>;
  
  return (
    <div className={styles.cart}>
      {productsToCart.length > 0 ? (
        <>
          <div className={styles.total}>
            <button 
             onClick={() => history.push('/')}
             className={styles.backBtn}>
              <BiArrowBack size='1.5rem' />
            </button>
            <div className={styles.valueTotal}>
              <p>Valor total da compra</p>
              <h2>
                {(valueTotalToCart).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </h2>
            </div>
            <button className={styles.buyBtn}>Comprar Tudo</button>
          </div>
          {productsToCart.map((product) => (
            <ProductsToCart key={product.id} product={product} />
          ))}
        </>
      ) : (
        <h1>
          Sem produtos na lista, adicione <Link to="/">AQUI!</Link>
        </h1>
      )}
    </div>
  );
};

export default Cart;
