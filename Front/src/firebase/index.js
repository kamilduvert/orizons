import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FB_PROJECT_ID,
  storageBucket: 'orizons-f3800.appspot.com',
  messagingSenderId: process.env.REACT_APP_FB_MESS_SENDER_ID,
  appId: process.env.REACT_APP_FB_APP_ID,
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
