import {
  // eslint-disable-next-line import/named
  Auth,
  getAuth,
  deleteUser,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  signOut,
} from "firebase/auth";
// import auth from '../App';

//Create a new user the oldschool way
const createNewUser = async (auth: Auth, email: string, password: string) => {
  try {
    const newUser = await createUserWithEmailAndPassword(auth, email, password);
    return newUser;
  } catch (error) {
    console.log(error);
  }
};

//Sign in the user the oldschool way
const signInUser = async (
  auth: Auth,
  email: string,
  password: string,
  setErrorShowing: React.Dispatch<React.SetStateAction<boolean>>
): Promise<void> => {
  try {
    await setPersistence(auth, browserSessionPersistence);
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    setErrorShowing((state) => !state);
    setTimeout(() => {
      setErrorShowing((state) => !state);
    }, 3000);
  }
};

const logoutUser = async (auth: Auth) => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
};

const deleteFirebaseAccount = async (auth: Auth) => {
  const { currentUser } = auth;
  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const userDeleted = await deleteUser(currentUser!);
    return userDeleted;
  } catch (error) {
    console.log(error);
  }
};

export { createNewUser, signInUser, logoutUser, deleteFirebaseAccount };
