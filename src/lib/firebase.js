import firebase from 'firebase/app';
import 'firebase/auth';

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
