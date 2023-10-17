import { compare, hash } from "bcryptjs";
import { verify } from "jsonwebtoken";

async function hashPassword(password) {
  const hashedPassword = await hash(password, 10);
  return hashedPassword;
}
async function verifiyPass(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}
async function verifiyToken(token, secretKey) {
  try {
    const res = verify(token, secretKey);
    return { email: res.email };
  } catch (err) {
    console.log(err);
  }
}

export { hashPassword, verifiyPass, verifiyToken };
