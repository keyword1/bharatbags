import bcrypt from "bcrypt";

const generateHashedPassword = async (plainPassword) => {
  const saltRounds = await bcrypt.genSalt(10); // higher = stronger but slower
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
  console.log("Hashed Password:", hashedPassword);
  return hashedPassword;
};

// Example usage
generateHashedPassword("Bharat@1992");
// ====================
