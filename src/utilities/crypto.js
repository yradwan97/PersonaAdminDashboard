import CryptoJS from 'crypto-js';

let secretKey = "secret_key";

const handleDecryptedData = (data) => {
  let str = '';
  for (let i = 0; i < data.length; i++) {
    if (data[i] === " ") {
      str += "+"
    } else {
      str += data[i];
    }
  }

  return str;
}

export const encryptData = (data) => {
  let encryptedData;
  if (typeof data === "string") {
    encryptedData = CryptoJS.AES.encrypt(data, secretKey).toString();
  } else {
    encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  }
  return encryptedData;
}

export const decryptData = (data) => {
  const handleData = handleDecryptedData(data);
  const decrypted = CryptoJS.AES.decrypt(handleData, secretKey).toString(CryptoJS.enc.Utf8);

  return decrypted;
}

