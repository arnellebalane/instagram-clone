const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '.env.local'),
});

const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp();
const db = admin.firestore();

exports.amendNewPostData = functions.firestore.document('posts/{post}').onCreate((change) => {
  return change.ref.update({
    likesCount: 0,
    commentsCount: 0,
    latestComments: [],
  });
});

exports.updatePostCommentsData = functions.firestore.document('posts/{post}/comments/{comment}').onCreate((change) => {
  return db.runTransaction(async (t) => {
    const postRef = change.ref.parent.parent;
    const post = await t.get(postRef);
    const comment = await t.get(change.ref);
    return t.update(postRef, {
      commentsCount: post.data().commentsCount + 1,
      latestComments: post.data().latestComments.concat(comment.data()).slice(-2),
    });
  });
});
