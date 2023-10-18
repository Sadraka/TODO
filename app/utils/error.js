const error = (data) => {
  const { name, lastname, email, password, repassword } = data;
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g; //test@gmail.com
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; //At least 8 characters , Number & Letters

  const result = {
    emailResult: emailRegex.test(email),
    passwordResult: passwordRegex.test(password),
    matchpassword: password.length > 0 && password === repassword,
    nameResult: name && name.length > 0,
    lastnameResult: lastname && lastname.length > 0,
    signupResult: function () {
      const res =
        result.emailResult &&
        result.passwordResult &&
        result.matchpassword &&
        result.nameResult &&
        result.lastnameResult;
      return res;
    },
    loginResult: function () {
      const res = result.emailResult && result.passwordResult;
      return res;
    },
  };

  return result;
};
export default error;
