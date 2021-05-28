import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/functions';

firebase.initializeApp({
  apiKey: 'REPLACE_THIS_VALUE',
  authDomain: 'REPLACE_THIS_VALUE',
  projectId: 'REPLACE_THIS_VALUE',
  storageBucket: 'REPLACE_THIS_VALUE',
  messagingSenderId: 'REPLACE_THIS_VALUE',
  appId: 'REPLACE_THIS_VALUE',
});

export default firebase;
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export const functions = firebase.functions();
