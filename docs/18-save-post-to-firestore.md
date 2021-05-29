# Save post to Firestore

1. Add `uploadPhoto` method to `src/components/NewPostForm.vue`

   ```diff
     methods: {
       ...
   +   async uploadPhoto(file) {
   +     const fileName = uuid.v4().replace(/-/g, '');
   +     const fileType = file.type.split('/')[1];
   +     const photoRef = storage.ref(`photos/${this.currentUser.uid}/${fileName}.${fileType}`);
   +     try {
   +       await photoRef.put(file);
   +       return [true, photoRef];
   +     } catch (error) {
   +       console.error(error);
   +       return [false, error];
   +     }
   +   },
     },
   ```

1. Add `createPost` method to `src/components/NewPostForm.vue`

   ```diff
     methods: {
       ...
   +   async createPost(data) {
   +     const postRef = db.collection('posts').doc();
   +     const userRef = db.doc(`users/${this.currentUser.uid}`);
   +     try {
   +       await db.runTransaction(async (t) => {
   +         const user = await t.get(userRef);
   +         t.set(postRef, {
   +           caption: data.caption,
   +           photoURL: data.photoURL,
   +           datePosted: firebase.firestore.FieldValue.serverTimestamp(),
   +           likesCount: 0,
   +           commentsCount: 0,
   +           latestComments: [],
   +           author: {
   +             id: this.currentUser.uid,
   +             displayName: this.currentUser.displayName,
   +             photoURL: this.currentUser.photoURL,
   +           },
   +         });
   +         t.update(userRef, {
   +           postsCount: user.data().postsCount + 1,
   +         });
   +       });
   +       return [true, postRef];
   +     } catch (error) {
   +       console.error(error);
   +       return [false, error];
   +     }
   +   },
     },
   ```

1. Add `deletePhoto` method to `src/components/NewPostForm.vue`

   ```diff
     methods: {
       ...
   +   async deletePhoto(photoRef) {
   +     try {
   +       await photoRef.delete();
   +       return [true, photoRef];
   +     } catch (error) {
   +       console.error(error);
   +       return [false, error];
   +     }
   +   },
     },
   ```

1. Implement `submitForm` method in `src/components/NewPostForm.vue`

   ```diff
     export default {
       ...

       methods: {
         ...
   -     submitForm() {
   -       console.log(this.caption, this.file);
   -     },
   +     async submitForm() {
   +       const [successfulUploadPhoto, photoRef] = await this.uploadPhoto(this.file);
   +       if (!successfulUploadPhoto) {
   +         console.error(photoRef);
   +         return;
   +       }
   +
   +       const postData = {
   +         caption: this.caption,
   +         photoURL: await photoRef.getDownloadURL(),
   +       };
   +       const [successfulCreatePost, postRef] = await this.createPost(postData);
   +       if (!successfulCreatePost) {
   +         console.error(postRef);
   +         await this.deletePhoto(photoRef);
   +         return;
   +       }
   +
   +       this.clearForm();
   +     },
         ...
       },
     };
   ```

### Switch to completed branch for this step:

```bash
git checkout 18-save-post-to-firestore
```

---

- [**Return to previous step**](17-implement-newpostform-ui.md)
- [**Proceed to next step**](19-secure-data-with-security-rules.md)
