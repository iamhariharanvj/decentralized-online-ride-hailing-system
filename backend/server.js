import express from 'express';

import { initializeApp } from "firebase/app";

const app = express();

const firebaseConfig = {
  apiKey: "AIzaSyCiVoVmtKScejKyImNIOV73TjVKYoym8hg",
  authDomain: "olzaa-e9f25.firebaseapp.com",
  projectId: "olzaa-e9f25",
  storageBucket: "olzaa-e9f25.appspot.com",
  messagingSenderId: "184653710109",
  appId: "1:184653710109:web:a85c2e65a23dd600ff97f4",
  measurementId: "G-KS0VVLHN91"
};

const firebaseApp = initializeApp(firebaseConfig);

app.get('/', (req, res) => {
    res.send("Working");
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
    console.log(`Server is listening on  http://localhost:${PORT}/`);
});