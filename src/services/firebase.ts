

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

import {getDatabase} from 'firebase/database';

const firebaseConfig = { 
  
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_SOTORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

const firebase = initializeApp(firebaseConfig);

const auth = getAuth(firebase);
const database = getDatabase();


export {firebase, database, auth};






//   https://stackoverflow.com/questions/69139443/property-auth-does-not-exist-on-type-typeof-import-firebase-auth