import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyA31dGWsq2_u9zDRw4VTRUt1o0_8n2HJCA",
    authDomain: "ecommerce-9fc6a.firebaseapp.com",
    projectId: "ecommerce-9fc6a",
    storageBucket: "ecommerce-9fc6a.appspot.com",
    messagingSenderId: "379647137218",
    appId: "1:379647137218:web:c56611c95863249c55b25b"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();
export const auth = firebaseApp.auth();
    
export function loginWithGoogle() {
    auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
}
