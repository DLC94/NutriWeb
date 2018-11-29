import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/storage';

var config = {
    apiKey: "AIzaSyD-El5GXaoR-_gsf_DDdNRlndQ0Bbq46BU",
    authDomain: "nutriapp-58aac.firebaseapp.com",
    databaseURL: "https://nutriapp-58aac.firebaseio.com",
    projectId: "nutriapp-58aac",
    storageBucket: "nutriapp-58aac.appspot.com",
    messagingSenderId: "794112539338"
};
const app = firebase.initializeApp(config);

export {app};