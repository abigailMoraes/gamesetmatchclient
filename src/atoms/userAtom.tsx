/* eslint-disable import/prefer-default-export */
import { atom } from 'jotai';

interface UserData {
  email: string
  firebaseId:string
  id: number
  isAdmin: number
  name: string
}
export const loginDataAtom = atom<UserData | null>(null);
