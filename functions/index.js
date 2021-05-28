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

exports.amendNewPostAndUserData = functions.firestore.document('posts/{post}').onCreate((change) => {
  return db.runTransaction(async (t) => {
    const postRef = change.ref;
    const post = await t.get(postRef);
    const userRef = db.doc(`users/${post.data().author.id}`);
    const user = await t.get(userRef);
    t.update(postRef, {
      likesCount: 0,
      commentsCount: 0,
      latestComments: [],
    });
    t.update(userRef, {
      postsCount: user.data().postsCount + 1,
    });
  });
});

exports.updatePostCommentsData = functions.firestore.document('posts/{post}/comments/{comment}').onCreate((change) => {
  return db.runTransaction(async (t) => {
    const postRef = change.ref.parent.parent;
    const post = await t.get(postRef);
    const comment = await t.get(change.ref);
    t.update(postRef, {
      commentsCount: post.data().commentsCount + 1,
      latestComments: post.data().latestComments.concat(comment.data()).slice(-2),
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
