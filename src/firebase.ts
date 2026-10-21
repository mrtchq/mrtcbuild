import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as fbSignOut } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import { UserProfile } from './types';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Test connection on boot
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is currently offline or unreachable.');
    }
  }
}

export async function signInWithGoogle(): Promise<UserProfile> {
  const result = await signInWithPopup(auth, googleProvider);
  const fbUser = result.user;

  // Retrieve or create user profile in Firestore
  const userRef = doc(db, 'users', fbUser.uid);
  const userSnap = await getDoc(userRef).catch(() => null);

  if (userSnap && userSnap.exists()) {
    const data = userSnap.data();
    return {
      email: data.email || fbUser.email || '',
      displayName: data.displayName || fbUser.displayName || 'Builder',
      tier: data.tier || "Builder's Circle",
      memberSince: data.memberSince || new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      photoURL: fbUser.photoURL || undefined,
    };
  }

  // Create new profile record
  const newProfile: UserProfile = {
    email: fbUser.email || '',
    displayName: fbUser.displayName || fbUser.email?.split('@')[0] || 'Builder',
    tier: "Builder's Circle",
    memberSince: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    photoURL: fbUser.photoURL || undefined,
  };

  try {
    await setDoc(userRef, {
      ...newProfile,
      id: fbUser.uid,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  } catch {
    // Non-fatal if offline
  }

  return newProfile;
}

export async function firebaseSignOut() {
  try {
    await fbSignOut(auth);
  } catch {
    // ignore
  }
}
