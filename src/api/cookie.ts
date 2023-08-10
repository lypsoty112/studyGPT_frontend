const encrypt = (text: string) => {
  // TODO: Implement encryption
  return text;
};

const decrypt = (text: string) => {
  // TODO: Implement decryption
  return text;
};

function setCookie(name: string, val: string) {
  const date = new Date();
  const encryptedName = encrypt(name);
  const encryptedVal = encrypt(val);
  // Set it to expire in 7 days
  date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);

  // Set it
  document.cookie =
    encryptedName +
    "=" +
    encryptedVal +
    "; expires=" +
    date.toUTCString() +
    "; path=/";
}

function getCookie(name: string): string | undefined {
  const encryptedName = encrypt(name);

  const value = "; " + document.cookie;
  const parts = value.split("; " + encryptedName + "=");

  if (parts.length === 2) {
    const popped = parts.pop();
    if (popped) {
      const val = popped.split(";").shift();
      if (val) {
        return val;
      }
    }
  }
  return undefined;
}

function deleteCookie(name: string) {
  const encryptedName = encrypt(name);

  const date = new Date();

  // Set it to expire in -1 days
  date.setTime(date.getTime() - 1 * 24 * 60 * 60 * 1000);

  // Set it to an empty value to delete the cookie
  document.cookie =
    encryptedName + "=; expires=" + date.toUTCString() + "; path=/";
}

export { setCookie, getCookie, deleteCookie };
