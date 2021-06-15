import React from "react";

import { BsHeartFill } from "react-icons/bs";

import styles from "./Footer.module.scss";
import { useEcommerceContext } from "../../contexts/EcommerceContext";

const Footer = () => {
  const { user } = useEcommerceContext();
  if (!user) return null;

  return (
    <div className={styles.footer}>
      <h4>
        Feito com <BsHeartFill color="blue" /> por{" "}
        <a 
        target='_blank'
        href="https://www.linkedin.com/in/ramon-silva-65bb78188/" rel="noreferrer">
          Ramon Silva
        </a>{" "}
      </h4>
    </div>
  );
};

export default Footer;
