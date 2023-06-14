const characters =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!£$%^&*~:#@?.=-_|+=ŧøæßðđŋł¢";

export function randomString(length) {
  let rand = "";
  for (let i = 0; i < length; i++) {
    const randNum = parseInt(Math.random() * characters.length);
    rand += characters.slice(randNum, randNum+1) 
  }
  return rand;
}
