import fs from 'fs';
import { promisify } from 'util';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs'
import { User } from "../types/types";

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const handleSignup = async (newUser: User) => {
  const db = await readFileAsync(`./src/db/usersDb.json`, 'utf8');
  const { users } = JSON.parse(db);
  const existingUser: User | undefined = users.find((user: User) => user.username === newUser.username);

  if (existingUser) {
    return true;
  } else {
    const hashedPassword = await bcrypt.hash(newUser.password, 10);

    const user = {
      id: uuidv4(),
      username: newUser.username,
      password: hashedPassword
    };

    users.push(user);

    return writeFileAsync(`./src/db/usersDb.json`, JSON.stringify({ users }, null, ' '))
      .then(() => false);
  }
}

export { handleSignup }