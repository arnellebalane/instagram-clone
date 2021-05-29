# Secure data with Security Rules

1. Add security rules for Cloud Firestore in `storage.rules`

   ```diff
     rules_version = '2';
     service firebase.storage {
       match /b/{bucket}/o {
   +     match /photos/{user}/{photo} {
   +       function validateCreatePhotoRequest(user) {
   +         return request.auth != null
   +           && user == request.auth.uid
   +           && request.resource.contentType.matches('image/.*');
   +       }
   +
   +       function validateDeletePhotoRequest(user) {
   +         return request.auth != null && user == request.auth.uid;
   +       }
   +
   +       allow read: if request.auth != null;
   +       allow create: if validateCreatePhotoRequest(user);
   +       allow delete: if validateDeletePhotoRequest(user);
   +     }

         match /{allPaths=**} {
   -       allow read, write: if request.auth!=null;
   +       allow read, write: if false;
         }
       }
     }
   ```

1. Add security rules for Cloud Firestore in `firestore.rules`

   ```diff
     rules_version = '2';
     service cloud.firestore {
       match /databases/{database}/documents {
   +     function validateCreatePostRequest() {
   +       let fields = ['caption', 'photoURL', 'datePosted', 'likesCount', 'commentsCount', 'latestComments', 'author'];
   +       return request.auth != null
   +         && request.resource.data.keys().hasAll(fields)
   +         && request.resource.data.keys().hasOnly(fields)
   +         && request.resource.data.author.id == request.auth.uid
   +         && request.resource.data.datePosted == request.time
   +         && request.resource.data.likesCount == 0
   +         && request.resource.data.commentsCount == 0
   +         && request.resource.data.latestComments == []
   +         && request.resource.data.caption is string
   +         && request.resource.data.photoURL is string;
   +     }
   +
   +     function validateUpdateUserRequest(user) {
   +       return request.auth != null
   +         && request.auth.uid == user
   +         && request.writeFields.hasAll(['postsCount'])
   +         && request.writeFields.hasOnly(['postsCount'])
   +         && request.resource.data.postsCount == resource.data.postsCount + 1;
   +     }
   +
   +     match /posts/{post} {
   +       allow read: if request.auth != null;
   +       allow create: if validateCreatePostRequest();
   +     }
   +
   +     match /users/{user} {
   +       allow read: if request.auth != null;
   +       allow update: if validateUpdateUserRequest(user);
   +     }

         match /{document=**} {
   -       allow read, write: if
   -           request.time < timestamp.date(2021, 6, 25);
   +       allow read, write: if false;
         }
       }
     }
   ```

### Switch to completed branch for this step:

```bash
git checkout 19-secure-data-with-security-rules
```

---

- [**Return to previous step**](18-save-post-to-firestore.md)
- [**Proceed to next step**](20-add-loading-state-and-error-handling.md)
