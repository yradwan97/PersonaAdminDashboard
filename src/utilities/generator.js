const generator = () => {
  const str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
  let result = '';
  for (let i = 0; i < 7; i++) {
    result += str[Math.floor(Math.random() * str.length)];
  }
  return result;
}

export default generator