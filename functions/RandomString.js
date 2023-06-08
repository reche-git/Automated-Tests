function generateString() {
  let user = "";
  let password = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < 9) {
    user += characters.charAt(Math.floor(Math.random() * charactersLength));
    password += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  password += "?";
  return user, password;
}