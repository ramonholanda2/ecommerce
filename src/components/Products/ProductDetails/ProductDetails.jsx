import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";

import { useEcommerceContext } from "../../../contexts/EcommerceContext";

import styles from "./ProductDetails.module.scss";

const ProductDetails = () => {
  const { productDetails, hiddenProductDetails } = useEcommerceContext();
  const [padding, setPadding] = useState(false);
  const [hidden, setHidden] = useState(false);

  function scollY() {
    if (window.scrollY > 88) {
      setPadding(true);
    } else {
      setPadding(false);
    }
  }

  function hiddenAll() {
    setHidden(true);
    setTimeout(() => {
      hiddenProductDetails();
    }, 700);
  }

  window.addEventListener("scroll", scollY);

  return (
    <div
      className={`${styles.productDetails} ${padding && styles.padding} ${
        !hidden ? styles.transitionON : styles.transitionOFF
      }`}
    >
      <div className={styles.details}>
        <h1>{productDetails.data.name}</h1>
        <img src={productDetails.data.image} alt="" />
        <p>{productDetails.data.about}</p>
        <div>
          <span>
            Preço{" "}
            <b>
              {productDetails.data.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </b>
          </span>
          <button>Comprar</button>
        </div>
      </div>

      <div className={styles.back}>
        <button onClick={hiddenAll}>
          <BiArrowBack size="2.5rem" />
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
