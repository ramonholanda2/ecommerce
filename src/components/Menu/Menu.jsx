import React, { useState } from "react";

import { VscChromeClose } from "react-icons/vsc";
import { db } from "../../api/firebase";

import { useEcommerceContext } from "../../contexts/EcommerceContext";

import styles from "./Menu.module.scss";

const Menu = () => {
  const { user, logout, renderMenu } = useEcommerceContext();
  const [name, setName] = useState([]);

  db.collection("users")
    .doc(user.uid)
    .get()
    .then((doc) => {
      setName(doc.data());
    })
    .catch((error) => {
      console.error(error);
    });

  return (
    <div className={styles.menu}>
      <div className={styles.details}>
        <button onClick={() => renderMenu()} className={styles.closeMenu}>
          <VscChromeClose size="2rem" />
        </button>
        <div className={styles.header}>
          <header>
            <h3>
              Olá, {user?.displayName || name.name + " " + name.surname} !
            </h3>
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
