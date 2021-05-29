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

exports.createComment = functions.https.onCall((data, context) => {
  return db.runTransaction(async (t) => {
    const postRef = db.doc(`posts/${data.postId}`);
    const commentRef = postRef.collection('comments').doc();
    const comment = {
      body: data.body,
      datePosted: new Date(),
      author: {
        id: context.auth.uid,
        displayName: context.auth.token.name,
      },
    };
    const post = await t.get(postRef);
    t.set(commentRef, comment);
    t.update(postRef, {
      commentsCount: post.data().commentsCount + 1,
      latestComments: post.data().latestComments.concat(comment).slice(-2),
    });
  });
});

exports.likePost = functions.https.onCall((data, context) => {
  return db.runTransaction(async (t) => {
    const likeRef = db.doc(`users/${context.auth.uid}/likes/${data.postId}`);
    const postRef = db.doc(`posts/${data.postId}`);
    const post = await t.get(postRef);
    t.set(likeRef, {});
    t.update(postRef, {
      likesCount: post.data().likesCount + 1,
    });
  });
});

exports.unlikePost = functions.https.onCall((data, context) => {
  return db.runTransaction(async (t) => {
    const likeRef = db.doc(`users/${context.auth.uid}/likes/${data.postId}`);
    const postRef = db.doc(`posts/${data.postId}`);
    const post = await t.get(postRef);
    t.delete(likeRef);
    t.update(postRef, {
      likesCount: post.data().likesCount - 1,
    });
  });
});
