import jwt from "jsonwebtoken";

const genetateTokens = (userid) => {
  return jwt.sign({ id: userid }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
export default genetateTokens;
