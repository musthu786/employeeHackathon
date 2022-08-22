import firebase from 'firebase/app';
import 'firebase/auth';
import '@firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyATpd1FRj-nF76J4FKX-mPWB0ORnfb-g0E",
    authDomain: "employeehhackethon.firebaseapp.com",
    projectId: "employeehhackethon",
    storageBucket: "employeehhackethon.appspot.com",
    messagingSenderId: "496729081900",
    appId: "1:496729081900:web:1303a36ee9aaee3543a989",
  };

let Firebase;

if (firebase.apps.length === 0) {
  Firebase = firebase.initializeApp(firebaseConfig);
  
}

export default Firebase;