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
    await db.runTransaction(async (t) => {
      const query = db.collection('posts').where('author.id', '==', user.uid);
      const userRef = db.doc(`users/${user.uid}`);

      const snapshot = await t.get(query);
      t.update(userRef, {
        postsCount: snapshot.size,
      });
    });
  }
})();
