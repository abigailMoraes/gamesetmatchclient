import firebase from 'firebase/compat/app';

const authorizationToken: Promise<string> = () => firebase.auth().currentUser?.getIdToken().then((idToken) => (idToken || ''));

const SecurityService = {
  authorizationToken,
};

export default SecurityService;
