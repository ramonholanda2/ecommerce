import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookSquare } from "react-icons/fa";

import { useEcommerceContext } from "../../contexts/EcommerceContext";
import { loginWithGoogle, loginWithFacebook } from "../../api/firebase";
import { useHistory } from "react-router";
import validator from "validator";

import styles from "./Login.module.scss";

const Login = () => {
  const { 
    user, 
    createAccount, 
    loginWithEmailAndPassword, 
    renderErrorLogin 
  } = useEcommerceContext();

  const [renderCreateAccount, setRenderCreateAccount] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState();
  const [isEmail, setIsEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [verifyInputs, setVerifyInputs] = useState(false);

  const history = useHistory();

  function backToLogin() {
    setRenderCreateAccount(false);
    setVerifyInputs(false);
  }

  function checkInputs() {
    setVerifyInputs(true);

    const allInptsValidBool =
      name.length >= 2 &&
      surname.length >= 2 &&
      isEmail &&
      password.length >= 8;

    if (allInptsValidBool) {
      createAccount(email, password, name, surname);
    }
  }

  const loginWithKeyPress = (event) => {
    if (event.code === "Enter") {
      console.log(email, password)
      loginWithEmailAndPassword(email, password)
    }
  };

  const createAccountWithKeyPress = (event) => {
    if(event.code === 'Enter') {
      checkInputs();
    }
  }

  function verifyEmail(email) {
    setEmail(email);
    if (validator.isEmail(email)) {
      setIsEmail(true);
    } else {
      setIsEmail(false);
    }
  }

  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [history, user]);

  return (
    <div className={styles.login}>
      <div className={styles.loginCard}>
        <h1>{!renderCreateAccount ? "Login" : "Criar Conta"}</h1>
        <div className={styles.loginEmailAndPassword}>
          {!renderCreateAccount ? (
            <>
              <div className={styles.email}>
                <span>Email</span>
                <input
                  onKeyPress={loginWithKeyPress}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  type="text"
                />
              </div>
              <div className={styles.password}>
                <span>Senha</span>
                <input
                  onKeyPress={loginWithKeyPress}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Senha"
                  type="password"
                />
              </div>

              {renderErrorLogin === "auth/user-not-found" ? (
                <p>Este usuário não existe</p>
              ) : null}
              {renderErrorLogin === "auth/invalid-email" ? (
                <p>Dados inválidos</p>
              ) : null}
              {renderErrorLogin === "auth/wrong-password" ? (
                <p>Senha inválida</p>
              ) : null}

              <button
                onClick={() => loginWithEmailAndPassword(email, password)}
                className={styles.btnLogin}
              >
                Entrar
              </button>
            </>
          ) : (
            <>
              <div className={styles.loginInpts}>
                <div className={styles.name}>
                  <div>
                    <span>Nome</span>
                    <input
                      onKeyPress={createAccountWithKeyPress}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nome"
                      type="text"
                    />
                    {name.length < 2 && verifyInputs === true ? (
                      <p>Campo obrigatório</p>
                    ) : null}
                  </div>
                  <div>
                    <span>Sobrenome</span>
                    <input
                      onKeyPress={createAccountWithKeyPress}
                      onChange={(e) => setSurname(e.target.value)}
                      placeholder="Sobrenome"
                      type="text"
                    />
                    {surname.length < 2 && verifyInputs === true ? (
                      <p>Campo obrigatório</p>
                    ) : null}
                  </div>
                </div>
                <span>Email</span>
                <input
                  onKeyPress={createAccountWithKeyPress}
                  onChange={(e) => verifyEmail(e.target.value)}
                  placeholder="Crie um email"
                  type="text"
                />
                {!isEmail && verifyInputs === true ? (
                  <p>Email inválido</p>
                ) : null}

                <span>Senha</span>
                <input
                  onKeyPress={createAccountWithKeyPress}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Crie uma senha"
                  type="password"
                />
                {password.length < 8 && verifyInputs === true ? (
                  <p>senha com no mínimo 8 caracteres</p>
                ) : null}
              </div>
              <div className={styles.loginButtons}>
                <button onClick={() => backToLogin()}>Voltar</button>
                <button onClick={() => checkInputs()}>Salvar</button>
              </div>
            </>
          )}
        </div>

        <div
          style={
            renderCreateAccount ? { display: "none" } : { display: "flex" }
          }
          className={styles.loginOptions}
        >
          <div className={styles.createAccount}>
            <div className={styles.border} />
            <button onClick={() => setRenderCreateAccount(true)}>
              Criar Conta
            </button>
            <p>ou continue com</p>
            <div className={styles.border} />
          </div>
          <div className={styles.loginAccount}>
            <button onClick={() => loginWithGoogle()}>
              <FcGoogle size="1.6rem" />
              <span>Google</span>
            </button>
            <button onClick={() => loginWithFacebook()}>
              <FaFacebookSquare size="1.6rem" />
              <span>Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
