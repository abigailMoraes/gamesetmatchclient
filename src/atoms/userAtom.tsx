/* eslint-disable import/prefer-default-export */
import { atom } from 'jotai';

export const loginDataAtom = atom(
  localStorage.getItem('loginData')
    ? JSON.parse(localStorage.getItem('loginData') as string)
    : null,
);
