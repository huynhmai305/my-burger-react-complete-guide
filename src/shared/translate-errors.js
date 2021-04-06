const obj = {
  INVALID_EMAIL: "Email is not correct, please re-enter!",
  EMAIL_EXISTS: "Email already exists, please re-enter!",
  INVALID_PASSWORD: "Password is not correct, please re-enter!",
};

export const translate = (errors) => {
  if (!obj[errors.message]) return;
  return { ...errors, message: obj[errors.message] };
};
