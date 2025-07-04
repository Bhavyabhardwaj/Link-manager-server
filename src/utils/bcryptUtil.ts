import bcrypt from "bcryptjs";
import { BCRYPT_SALT_ROUND } from "../config/bcryptConfig";

export const generateHashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUND);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const verifyPassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};
