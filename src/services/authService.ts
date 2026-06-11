import auth from '@react-native-firebase/auth';

export const registerUser = async (
  email: string,
  password: string,
) => {
  return auth().createUserWithEmailAndPassword(
    email,
    password,
  );
};

export const loginUser = async (
  email: string,
  password: string,
) => {
  return auth().signInWithEmailAndPassword(
    email,
    password,
  );
};

export const logoutUser = async () => {
  return auth().signOut();
};