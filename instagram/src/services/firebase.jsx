import { FieldValue, Firestore } from "firebase/firestore";
import {  db } from "../lib/firebase";

export async function doesUsernameExist(username) {
  const result = await db
    .collection("users")
    .where("username", "==", username.toLowerCase())
    .get();

  return result.docs.length > 0;
}

export async function getUserByUsername(username) {
  const result = await db
    .collection("users")
    .where("username", "==", username.toLowerCase())
    .get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
}

// get user from the firestore where userId === userId (passed from the auth)
export async function getUserByUserID(userId) {
  const result = await db
    .collection("users")
    .where("userId", "==", userId)
    .get();
  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return user;
}

// check all conditions before limit results

export async function getSuggestedProfiles(userId, following) {
  let query = db.collection("users");

  if (following.length > 0) {
    query = query.where("userId", "not-in", [...following, userId]);
  } else {
    query = query.where("userId", "!=", userId);
  }

  const result = await query.limit(10).get();

  const profiles = result.docs.map((user) => ({
    ...user.data(),
    docId: user.id,
  }));

  return profiles;
}

export async function updateLoggedInUserFollowing(
  loggedInUserDocId, // currently logged in user document id (karl's profile)
  profileId, // the user that karl requests to follow
  isFollowingProfile // true/false (am i currently following this person?)
) {
  return db
    .collection("users")
    .doc(loggedInUserDocId)
    .update({
      following: isFollowingProfile
        ? Firestore.FieldValue.arrayRemove(profileId)
        : Firestore.FieldValue.arrayUnion(profileId),
    });
}

export async function updateFollowedUserFollowers(
  profileDocId,
  loggedInUserDocId,
  isFollowingProfile
) {
  return db
    .collection("users")
    .doc(profileDocId)
    .update({
      following: isFollowingProfile
        ? Firestore.FieldValue.arrayRemove(loggedInUserDocId)
        : Firestore.FieldValue.arrayUnion(loggedInUserDocId),
    });
}

export async function getPhotos(userId, following) {
    const result = await db
    .collection('photos')
    .where('userId', 'in', following)
    .get()

     const userFollowedPhotos = result.docs.map((photo) => ({
       ...photo.data(),
       docId: photo.id,
     }));

     const photosWithUserDetails = await Promise.all(
        userFollowedPhotos.map(async (photo) => {
          let userLikedPhoto = false;

          if (photo.likes.includes(userId)) {
            userLikedPhoto = true;
          }
          // photo.userId = 2
          const user = await getUserByUserId(photo.userId);
          // raphael
          const { username } = user[0];
          return { username, ...photo, userLikedPhoto };
        })
     )
}
