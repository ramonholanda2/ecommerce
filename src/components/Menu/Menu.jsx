import React from "react";

import { VscChromeClose } from "react-icons/vsc";

import { useEcommerceContext } from "../../contexts/EcommerceContext";

import styles from "./Menu.module.scss";

const Menu = () => {
  const { user, logout, renderMenu } = useEcommerceContext();

  return (
    <div className={styles.menu}>
      <div
        className={styles.details}
      >
        <button onClick={() => renderMenu()} className={styles.closeMenu}>
          <VscChromeClose size="2rem" />
        </button>
        <div className={styles.header}>
          <header>
            <h2>Olá, {user?.displayName} !</h2>
          </header>
        </div>
        <div className={styles.options}>
          <button onClick={() => logout()}>Sair</button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
