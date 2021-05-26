const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '.env.local'),
});

const functions = require('firebase-functions');

exports.amendNewPostData = functions.firestore.document('posts/{doc}').onCreate((change) => {
  return change.ref.update({
    likesCount: 0,
    commentsCount: 0,
    latestComments: [],
  });
});
