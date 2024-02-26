import fs from 'fs';
import { promisify } from 'util';
import bcrypt from 'bcryptjs'
import { User } from "../types/types";

const readFileAsync = promisify(fs.readFile);

const handleSignin = async (user: User) => {
  const db = await readFileAsync(`./src/db/usersDb.json`, 'utf8');
  const { users } = JSON.parse(db);
  const existingUser: User | undefined = users.find((u: User) => u.username === user.username);

  if (!existingUser) {
    return false;
  } else {
    const isPasswordMatch = await bcrypt.compare(user.password, existingUser.password);
    return !isPasswordMatch ? false : true;
  }
}

export { handleSignin }