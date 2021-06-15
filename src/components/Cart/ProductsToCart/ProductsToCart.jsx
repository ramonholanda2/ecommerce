import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { MdClear } from "react-icons/md";
import { useEcommerceContext } from '../../../contexts/EcommerceContext';

import styles from "./ProductsToCart.module.scss";

const ProductsToCart = ({ product }) => {
  const { 
    removeToCart, 
    plusProduct, 
    minusProduct, 
    changeQuantProducts 
  } = useEcommerceContext();
  
  return (
    <div className={styles.productsToCart}>
      <div className={styles.image}>
        <img src={product.data.image} alt={product.data.name} />
      </div>
      <div className={styles.productNameAndPrice}>
        <div className={styles.name}>
          <h2>{product.data.name}</h2>
        </div>
        <div className={styles.priceAndQuant}>
          <div className={styles.price}>
            <h3>
              {Number(product.data.price).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </h3>
          </div>
          <div className={styles.quant}>
            <button onClick={() => minusProduct(product)}>
              <AiOutlineMinus size="100%" />
            </button>
            <input
              onChange={(event) => changeQuantProducts(product, event.target.value)}
              value={product.quant}
            />
            <button onClick={() => plusProduct(product)}>
              <AiOutlinePlus size="100%" />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.subtotalAndExclude}>
        <button onClick={() => removeToCart(product)}>
          <MdClear size="100%" color="red" />
        </button>
        <span>
          Subtotal{" "}
          <b>
            {product.subtotal.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </b>{" "}
        </span>
      </div>
    </div>
  );
};

export default ProductsToCart;
