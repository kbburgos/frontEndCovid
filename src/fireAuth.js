import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyA_6DH5xDoKcOZYL2XNlJkKGWrIU54ZWCU",
  authDomain: "covidforce-eb161.firebaseapp.com",
  databaseURL: "https://covidforce-eb161.firebaseio.com",
  projectId: "covidforce-eb161",
  storageBucket: "covidforce-eb161.appspot.com",
  messagingSenderId: "1080630074257",
  appId: "1:1080630074257:web:518058574ec205e56a9830",
  measurementId: "G-VC8SD59Z0M",
};

const fb = firebase.initializeApp(firebaseConfig);

export const dba = fb.auth();
