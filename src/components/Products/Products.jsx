import React, { useEffect } from "react";
import { useEcommerceContext } from "../../contexts/EcommerceContext";
import { useHistory } from "react-router-dom";
import ProductDetails from './ProductDetails/ProductDetails';
import Product from "./Product/Product";
import styles from "./Products.module.scss";

const Products = () => {
  const { products, searchProducts, loading, user, productDetailsBool } = useEcommerceContext();
  const history = useHistory();

  useEffect(() => {

  }, []);

  useEffect(() => {
    if (!user && !loading) {
      history.push("/login");
    }
  }, [history, loading, user]);


  if (!products)
    return (
      <img
        className={styles.loading}
        src="/imgs/loading.gif"
        alt="Loading..."
      />
    );

  return (
    <div className={productDetailsBool ? styles.productDetails : styles.products}>
      {productDetailsBool && <ProductDetails />}

      {searchProducts.length !== 0 ? (
        searchProducts.map(product => (
          <Product key={product.id} product={product} />
        ))
      ) : (
        products.map((product) => (
          <Product key={product.id} product={product} />
        ))
      )}
    </div>
  );
};

export default Products;
