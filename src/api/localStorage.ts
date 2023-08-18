import { encrypt, decrypt } from "./cookie";

const setLocalStorage = (
  key: string,
  value: string,
  encrypted: boolean = false
) => {
  if (encrypted) value = encrypt(value);
  localStorage.setItem(key, value);
};

const getLocalStorage = (
  key: string,
  encrypted: boolean = false
): string | null => {
  let val = localStorage.getItem(key);
  if (!val) return null;
  if (encrypted) return decrypt(val);
  return val;
};

const deleteLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export { setLocalStorage, getLocalStorage, deleteLocalStorage };
