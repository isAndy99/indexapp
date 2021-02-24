import jwt from "jsonwebtoken";

const KEY = "PRIVATE_JWT_KEY"; // TODO: move to env

export const isTokenValid = (req) => {
  if (!req.cookies.token) {
    return false;
  }

  const token = req.cookies.token.split(" ")[1];

  try {
    jwt.verify(token, KEY);
  } catch (e) {
    console.log(e);
    return false;
  }

  return true;
};
