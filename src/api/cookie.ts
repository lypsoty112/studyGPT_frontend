import CryptoJS from "crypto-js";

const secretKey = "your-secret-key"; // replace with your actual secret key

const encrypt = (text: string) => {
  const ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(text),
    secretKey
  ).toString();
  return ciphertext;
};

const decrypt = (ciphertext: string) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

function setCookie(name: string, val: string) {
  const date = new Date();
  const encryptedVal = encrypt(val);
  // Set it to expire in 7 days
  date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);

  // Set it
  document.cookie =
    name + "=" + encryptedVal + "; expires=" + date.toUTCString() + "; path=/";
}

function getCookie(name: string): string | undefined {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");

  if (parts.length === 2) {
    const popped = parts.pop();
    if (popped) {
      const val = popped.split(";").shift();
      if (val) {
        return decrypt(val);
      }
    }
  }
  return undefined;
}

function deleteCookie(name: string) {
  const date = new Date();

  // Set it to expire in -1 days
  date.setTime(date.getTime() - 1 * 24 * 60 * 60 * 1000);

  // Set it to an empty value to delete the cookie
  document.cookie = name + "=; expires=" + date.toUTCString() + "; path=/";
}

export { setCookie, getCookie, deleteCookie, encrypt, decrypt };
