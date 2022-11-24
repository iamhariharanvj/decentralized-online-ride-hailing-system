import admin from 'firebase-admin'
import serviceAccount from './serviceAccount.js'
import bodyParser from 'body-parser'
import express from 'express';
import { initializeApp } from "firebase/app";
import cors from 'cors'

const app = express();
app.use(cors());
app.use(bodyParser.json());

const firebaseConfig = {
  apiKey: "AIzaSyCiVoVmtKScejKyImNIOV73TjVKYoym8hg",
  authDomain: "olzaa-e9f25.firebaseapp.com",
  projectId: "olzaa-e9f25",
  storageBucket: "olzaa-e9f25.appspot.com",
  messagingSenderId: "184653710109",
  appId: "1:184653710109:web:a85c2e65a23dd600ff97f4",
  measurementId: "G-KS0VVLHN91"
};

const fs = admin.initializeApp({credential: admin.credential.cert(serviceAccount)});
const db = fs.firestore();

  const userDB = db.collection("users");
  const ridesDB = db.collection("rides");
  const bidsDB = db.collection("bids");


  app.post('/createAccount',async(req, res) => {
    
    const user = req.body;
    try{
      await userDB.add(user);
      console.log(user);  
      res.json(user);     
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
})

app.get('/findUser/:email', async(req, res) => {
    const nUsers = await userDB.where("email", "==", req.params.email).get().then(
        (snap)=>snap.docs.length);


    res.send(nUsers!=0);
})

app.get('/getUser/:email', async(req, res) => {
  const user = await userDB.where("email", "==", req.params.email).get().then(
      (snap)=>snap.docs[0].data());


  res.send(user);
})

app.get('/getRides', async(req, res) => {
  let unassignedRides = []
  const rides = await ridesDB.where("isAssigned", "==", false).get().then(
      (snap)=>snap.docs.forEach(doc => unassignedRides.push(doc.data()))
      
      
      );

  res.send(unassignedRides);
})

app.get('/getBids/:walletAddress', async(req, res) => {

  let bids = []
  await bidsDB.where("walletAddress", "==", req.params.walletAddress).get().then(
      (snap)=>snap.docs.forEach(doc => bids.push(doc.data()))
      );

  res.send(bids);
})

app.post('/bookRide', async(req, res) => {

  const ride = {pickup: req.body.pickup, dropoff: req.body.dropoff, walletAddress: req.body.walletAddress}
  const walletAddress = req.body.walletAddress;
  const pickupLongitude = req.body.pickup[0];
  const pickupLatitude = req.body.pickup[1];
  const dropOffLongitude = req.body.pickup[0];
  const dropOffLatitude = req.body.pickup[1];
  const isAssigned = false;
  
  ridesDB.add({walletAddress: walletAddress,
    pickupLongitude: pickupLongitude,
    pickupLatitude: pickupLatitude,
    dropOffLongitude: dropOffLongitude,
    dropOffLatitude: dropOffLatitude, 
    isAssigned: isAssigned}
    );
  
    res.send({walletAddress: walletAddress,
      pickupLongitude: pickupLongitude,
      pickupLatitude: pickupLatitude,
      dropOffLongitude: dropOffLongitude,
      dropOffLatitude: dropOffLatitude, 
      isAssigned: isAssigned});

})

app.post('/bid', async(req, res) => {

  const bid ={
   walletAddress : req.body.walletAddress,
   pickupLongitude : req.body.pickupLongitude,
   pickupLatitude : req.body.pickupLatitude,
   dropOffLongitude : req.body.dropOffLongitude,
   dropOffLatitude : req.body.dropOffLatitude,
   driverName : req.body.driverName,
   driverPhone : req.body.driverPhone,
   bidAmount : req.body.bidAmount,
   isAssigned : req.body.isAssigned,
  }

  
    await bidsDB.add(bid);
  
    res.send(bid);

})



const PORT = process.env.PORT || 4000;



app.listen(PORT, ()=>{
    console.log(`Server is listening on  http://localhost:${PORT}/`);
});