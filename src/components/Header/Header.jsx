import React from "react";

import { Link, useLocation } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";
import Menu from "../Menu/Menu";
import { useEcommerceContext } from "../../contexts/EcommerceContext";

import styles from "./Header.module.scss";

const Header = () => {
  const { productsToCart, searchProduct, renderMenu, menu, products} = useEcommerceContext();
  let location = useLocation();

  return (
    <>
      <div className={styles.header}>
        <div className={styles.img}>
          <Link to="/">
            <img src="/imgs/commerce.png" alt="" />
          </Link>
        </div>
        <div className={styles.inpt}>
          {products && location.pathname === '/' && (
            <input 
              onChange={(event) => searchProduct(event.target.value.toLocaleLowerCase())}
              type="text" placeholder="Pesquisar..." />
          )}
        </div>
        <div className={styles.options}>
          <div className={styles.btns}>
            <span>{productsToCart?.length}</span>
            <button>
              <Link to="/cart">
                <FiShoppingCart size="2rem" />
              </Link>
            </button>
            <button onClick={() => renderMenu()}>
              <FiMenu size="2rem" />
            </button>
          </div>
            {menu && <Menu />}
        </div>
      </div>
    </>
  );
};

export default Header;
