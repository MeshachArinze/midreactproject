import { firebase, db } from "../lib/firebase";

export async function doesUsernameExist(username) {
    const result = await db
    .collection('users')
    .where('username', '==', username.toLowerCase())
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

export async function  getUserByUserID() {
    
}