import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from  'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAcC9LBzYBqY_MqyoGtTtXTcagXU7cQze4",
    authDomain: "connect-6ea08.firebaseapp.com",
    projectId: "connect-6ea08",
    storageBucket: "connect-6ea08.appspot.com",
    messagingSenderId: "1024398677138",
    appId: "1:1024398677138:web:4e73adba0afc2da198824b"
};
  
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {
    await signInWithPopup(auth, provider).then((result)=>{
        const name = result.user.displayName;
        const email = result.user.email;
        const profilePic = result.user.photoURL;

        localStorage.setItem("name", name)
        localStorage.setItem("email", email)
        localStorage.setItem("profilePic", profilePic)
        
    }).catch(error => console.log(error))
}