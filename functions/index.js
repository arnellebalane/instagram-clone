const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../.env.local'),
});

const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp();
const db = admin.firestore();

exports.createUserProfile = functions.auth.user().onCreate((user) => {
  return db.doc(`users/${user.uid}`).set({
    displayName: user.displayName,
    photoURL: user.photoURL,
    description: 'Hello world!',
    postsCount: 0,
    followersCount: 0,
    followingCount: 0,
  });
});
