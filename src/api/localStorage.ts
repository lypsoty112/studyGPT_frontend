const setLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

const getLocalStorage = (key: string): string | null => {
  return localStorage.getItem(key);
};

const deleteLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export { setLocalStorage, getLocalStorage, deleteLocalStorage };
