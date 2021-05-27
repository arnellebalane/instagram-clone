const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../.env.local'),
});

const admin = require('firebase-admin');
admin.initializeApp();

const auth = admin.auth();
const db = admin.firestore();

(async () => {
  const result = await auth.listUsers(1000);
  for (const user of result.users) {
    await db.doc(`users/${user.uid}`).set({
      displayName: user.displayName,
      photoURL: user.photoURL,
      description: 'Hello world!',
      postsCount: 0,
      followersCount: 0,
      followingCount: 0,
    });
  }
})();
