import React, { useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookSquare } from 'react-icons/fa';

import { useEcommerceContext } from '../../contexts/EcommerceContext';
import { useHistory } from 'react-router';
import { loginWithGoogle } from '../../api/firebase';

import styles from './Login.module.scss';

const Login = () => {
    const { user } = useEcommerceContext();

    const history = useHistory();

    useEffect(() => {
        if(user) {
            history.push('/');
        }
    }, [history, user])

    return (
        <div className={styles.login}>
            <div className={styles.loginCard}>
                <h1>Login</h1>
                <div className={styles.loginEmail}>
                    <span>Email</span>
                    <input placeholder='Email' type="text" />
                    <span>Senha</span>
                    <input placeholder='Senha' type="password" />
                </div>  
                <div className={styles.createAccount}>
                    <div className={styles.border} />
                    <button>Criar Conta</button>
                    <p>ou continue com</p>
                    <div className={styles.border} />
                </div>
                <div className={styles.loginAccount}>
                    <button onClick={() => loginWithGoogle()}>
                        <FcGoogle size='1.6rem' />
                        <span>Google</span>
                    </button>
                    <button>
                        <FaFacebookSquare size='1.6rem' />
                        <span>Facebook</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login
