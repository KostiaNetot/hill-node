import bcrypt from 'bcryptjs';

const hashPassword = async(password: string): Promise<string> => {
  try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
  } catch (error) {
      console.error('Error hashing password:', error);
      throw error;
  }
}

export { hashPassword }