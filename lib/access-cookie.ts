export const parseAccessCookie = () => {
  if (!('window' in globalThis)) return null;
  return document.cookie.match(/token=([^;]+)/)?.[1] || null;
};
