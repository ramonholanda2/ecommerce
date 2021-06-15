import React, { useEffect, useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { RiDeleteBin2Line } from "react-icons/ri";
import { db } from "../../../api/firebase";

import { useEcommerceContext } from "../../../contexts/EcommerceContext";
import styles from "./Product.module.scss";

const Product = ({ product }) => {
  const {
    addToCart,
    removeToCart,
    user,
    renderProductDetails,
    productDetailsBool,
  } = useEcommerceContext();
  const [existsInCart, setExistsInCart] = useState(Boolean);

  useEffect(() => {
    db.collection("cart")
      .doc(`cart_${user?.uid}`)
      .collection("products")
      .doc(product?.id)
      .onSnapshot((snapshot) => setExistsInCart(snapshot.exists));
  }, [product?.id, user?.uid]);

  return (
    <>
      <div
        style={
          productDetailsBool && window.innerWidth < 900
            ? { display: "none" }
            : { display: "block" }
        }
        className={styles.productDetails}
      >
        <div className={styles.product}>
          <h3 onClick={() => renderProductDetails(product)}>
            {product.data.name}
          </h3>
          <img
            onClick={() => renderProductDetails(product)}
            src={product.data.image}
            alt={product.data.name}
          />
        </div>

        <div className={styles.buyProduct}>
          <div className={styles.buy}>
            <span>
              Preço{" "}
              <b>
                {product.data.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}{" "}
                R$
              </b>{" "}
            </span>
            <button onClick={() => renderProductDetails(product)}>
              Comprar
            </button>
          </div>
          <div className={styles.addCart}>
            {existsInCart ? (
              <>
                <button>
                  <span onClick={() => removeToCart(product)}>
                    Remover do Carrinho
                  </span>
                </button>
                <button
                  onClick={() => removeToCart(product)}
                  className={styles.cart}
                >
                  <RiDeleteBin2Line size="1.3rem" />
                </button>
              </>
            ) : (
              <>
                <button>
                  <span onClick={() => addToCart(product)}>
                    Adicionar ao carrinho
                  </span>
                </button>
                <button
                  onClick={() => addToCart(product)}
                  className={styles.cart}
                >
                  <MdAddShoppingCart size="1.3rem" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
