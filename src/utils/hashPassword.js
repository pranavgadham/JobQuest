import argon2 from 'argon2';

export const hashPassword = async (password) => {
  try {
    return await argon2.hash(password);
  } catch (error) {
    throw error;
  }
};
export const compareHashedPassword = async (password, hashPassword) => {
  try {
    return await argon2.verify(hashPassword, password);
  } catch (error) {
    throw error;
  }
};