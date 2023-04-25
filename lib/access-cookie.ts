import { atom } from 'recoil';

export const accessCookieAtom = atom<string | null>({
  key: 'accessCookie',
  default: null,
});

export const parseAccessCookie = () => {
  if (!('window' in globalThis)) return null;
  return document.cookie.match(/token=([^;]+)/)?.[1] || null;
};
