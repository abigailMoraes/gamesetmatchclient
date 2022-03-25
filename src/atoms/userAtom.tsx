/* eslint-disable import/prefer-default-export */
import { atom } from 'jotai';
import { User } from '../interfaces/User';

export const emptyUser:User = {
  email: '',
  firebaseId: '',
  id: -1,
  isAdmin: -1,
  name: '',
};

const emptyUserString = JSON.stringify(emptyUser);

export const loginDataAtom = atom(JSON.parse(localStorage.getItem('userData') || emptyUserString));

export const loginDataAtomPersistence = atom(
  (get) => get(loginDataAtom),
  (get, set, userData:User) => {
    set(loginDataAtom, userData);
    localStorage.setItem('userData', JSON.stringify(userData));
  },
);

export const userIDAtom = atom<number>((get) => get(loginDataAtom).id);
