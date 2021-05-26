import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

firebase.initializeApp({
  apiKey: 'AIzaSyAXdcZ5iPaIVvQigRaJLirDtyxehC2sMkw',
  authDomain: 'instagram-clone.arnelle.me',
  projectId: 'instagram-clone-2d8bc',
  storageBucket: 'instagram-clone-2d8bc.appspot.com',
  messagingSenderId: '595004279383',
  appId: '1:595004279383:web:c8dec3d037e90c68677112',
});

export default firebase;
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();

if (import.meta.env.VITE_USE_EMULATORS === 'true') {
  auth.useEmulator('http://localhost:9099');
  db.useEmulator('localhost', 8081);
  storage.useEmulator('localhost', 9199);
}
