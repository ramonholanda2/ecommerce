import React, { createContext, useContext, useState, useEffect } from "react";
import firebase from "firebase";
import { db, auth } from "../api/firebase";
import { useHistory } from "react-router-dom";

export const EcommerceContext = createContext();

export const EcommerceContextProvider = ({ children }) => {
  const [menu, setMenu] = useState(false);
  const [products, setProducts] = useState(null);
  const [searchProducts, setSearchProducts] = useState('');
  const [productsToCart, setProductsToCart] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const [productDetailsBool, setProductDetailsBool] = useState(false);
  const [valueTotalToCart, setValueTotalToCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [renderErrorLogin, setRenderErrorLogin] = useState(null);
  const [user, setUser] = useState(null);
  const history = useHistory();

  function createAccount(email, password, name, surname) {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        return db.collection("users").doc(data.user.uid).set({
          name: name,
          surname: surname,
        });
      })
      .catch((error) => {
        console.log("Erro ao criar Conta", error);
      });
  }

  function loginWithEmailAndPassword(email, password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        setUser(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        setRenderErrorLogin(errorCode);
        console.log("Erro ao logar", errorCode);
      });
  }

  function logout() {
    auth.signOut();
    history.push("/login");

    if(menu){
      setMenu(false);
    }
  }

  function renderMenu() {
    setMenu(!menu);
  }

  function searchProduct(value) {
    let searched = [];
    
    products.forEach(product => {
      let productLowerCase = product.data.name.toLowerCase();

      if(productLowerCase.includes(value)) {
        searched.push(product)
        setSearchProducts(searched);
      }
    })

  }

  function renderProductDetails(product) {
    setProductDetailsBool(true);
    setProductDetails(product);
  }

  function hiddenProductDetails() {
    setProductDetailsBool(false);
  }

  function addToCart(product) {
    // adicionar produto ao carrinho
    db.collection("cart")
      .doc(`cart_${user.uid}`)
      .collection("products")
      .doc(product.id)
      .set({
        ...product,
        createdAt: Number(new Date()),
        quant: 1,
        subtotal: product.data.price,
      });
  }

  function removeToCart(product) {
    db.collection("cart")
      .doc(`cart_${user.uid}`)
      .collection("products")
      .doc(product.id)
      .delete();
  }

  function plusProduct(product) {
    if (product.quant < 999) {
      db.collection("cart")
        .doc(`cart_${user.uid}`)
        .collection("products")
        .doc(product.id)
        .update({
          quant: product.quant + 1,
          subtotal: (product.quant + 1) * product.data.price,
        });
    }
  }

  function minusProduct(product) {
    if (product.quant > 1) {
      db.collection("cart")
        .doc(`cart_${user.uid}`)
        .collection("products")
        .doc(product.id)
        .update({
          quant: product.quant - 1,
          subtotal: (product.quant - 1) * product.data.price,
        });
    }
  }

  function changeQuantProducts(product, value) {
    let numbers = value.replace(/([^\d])+/gim, "");
    if (numbers.length <= 3) {
      db.collection("cart")
        .doc(`cart_${user.uid}`)
        .collection("products")
        .doc(product.id)
        .update({
          quant: Number(numbers),
          subtotal: Number(numbers) * product.data.price,
        });
    }
  }

  useEffect(() => {
    // pega dados dos usuários
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
      setRenderErrorLogin(null);
    });
    
    // pega dados dos produtos
    db.collection("products").onSnapshot((snapshot) => {
      setProducts(
        snapshot.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }))
      );
    });

    // pega dados dos produtos
    db.collection("products").onSnapshot((snapshot) => {
      setProducts(
        snapshot.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }))
      );
    });

  }, [])
  
  useEffect(() => {
    // pega dados dos produtos no carrinho
    if (user) {
      db.collection("cart")
        .doc(`cart_${user.uid}`)
        .collection("products")
        .orderBy("createdAt", "desc")
        .onSnapshot((snapshot) => {
          setProductsToCart(snapshot.docs.map((doc) => doc.data()));
        });
    }

    // soma o total do carrinho
    if (user) {
      db.collection("cart")
        .doc(`cart_${user.uid}`)
        .collection("products")
        .onSnapshot((snapshot) => {
          setValueTotalToCart(
            snapshot.docs.length > 0
              ? snapshot.docs
                  .map((doc) => doc.data().subtotal)
                  .reduce((acumulator, subtotal) => acumulator + subtotal)
              : null
          );
        });
    }
  }, [user]);

  return (
    <EcommerceContext.Provider
      value={{
        user,
        products,
        searchProducts,
        loading,
        menu,
        renderErrorLogin,
        productsToCart,
        valueTotalToCart,
        productDetails,
        productDetailsBool,
        createAccount,
        loginWithEmailAndPassword,
        logout,
        renderMenu,
        searchProduct,
        addToCart,
        removeToCart,
        plusProduct,
        minusProduct,
        changeQuantProducts,
        renderProductDetails,
        hiddenProductDetails,
      }}
    >
      {children}
    </EcommerceContext.Provider>
  );
};
export const useEcommerceContext = () => {
  return useContext(EcommerceContext);
};
