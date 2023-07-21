var firebaseConfig = {
  apiKey: "AIzaSyDt8tPp8zrI2tzBUwC8M6eQZ3xcJnQqKkc",
  authDomain: "yume-b18ba.firebaseapp.com",
  projectId: "yume-b18ba",
  appId: "1:643662045975:web:1ef2fc13214c0f883acd52",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const messageCollection = db.collection('messages');
