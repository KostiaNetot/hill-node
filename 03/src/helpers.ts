import fs from 'fs';
import { promisify } from 'util';
import { User, UsersDb } from "./types";

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

async function getAllUsers(): Promise<User[] | []> {
  try {
    const data: string = await readFileAsync('db.json', 'utf8');
    const usersData: UsersDb = JSON.parse(data);
    return usersData.users;
  } catch (err) {
    console.error('Read file async error: ', err);
    return [];
  }
}

async function addUser(newUser: User): Promise<void> {
  try {
    const users: User[] = await getAllUsers();
    users.push(newUser);
    const usersData: UsersDb = { users };
    await writeFileAsync('db.json', JSON.stringify(usersData, null, ' '));
  } catch (err) {
    console.error('Writting file error: ', err);
    throw err;
  }
}


export {
  addUser,
  getAllUsers,
}