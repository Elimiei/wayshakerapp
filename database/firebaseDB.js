import * as firebase from 'firebase';
import firestore from '@react-native-firebase/firestore';

export {usersCollection, questionsCollection, ideasCollection, signedIn};

const firebaseConfig = {
    apiKey: "AIzaSyAQg2Zmo1arwL_ZfJiTnrVGo8NtOdfJT8Y",
    authDomain: "wayshakerapp.firebaseapp.com",
    databaseURL: "https://wayshakerapp.firebaseio.com",
    projectId: "wayshakerapp",
    storageBucket: "wayshakerapp.appspot.com",
    messagingSenderId: "921470481025",
    appId: "1:921470481025:web:391da714833f76b6cd5380",
    measurementId: "G-P4QXQX8RZ6"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

let signedIn = false;
let ideasCollection;

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log("UN USER")
        signedIn = true;
        ideasCollection = usersCollection.doc(user.uid).collection('ideas');
    } else {
        signedIn = false;
    }
});

const usersCollection = firestore().collection('Users');
const questionsCollection = firestore().collection('Questions');



export default firebase;
