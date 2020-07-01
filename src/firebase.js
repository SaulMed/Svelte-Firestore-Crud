import firebase from 'firebase/app'
import  'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyDA_IfCzELVoccvjFpmxh4lJmfdH_2odBk",
    authDomain: "svelte-firestore-crud.firebaseapp.com",
    databaseURL: "https://svelte-firestore-crud.firebaseio.com",
    projectId: "svelte-firestore-crud",
    storageBucket: "svelte-firestore-crud.appspot.com",
    messagingSenderId: "725055789870",
    appId: "1:725055789870:web:9d6e73da73efc159daf8bf"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export const db = firebase.firestore()  //Instancia de la Base de datos