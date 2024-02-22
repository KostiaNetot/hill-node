import fs from 'fs';
import { promisify } from 'util';
import { User } from "../types/types";
import { hashPassword } from './hashPassword';

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const checkIfUserExist = (newUser: User, save: boolean | undefined = false) => {
  return readFileAsync(`./src/db/usersDb.json`, 'utf8')
    .then(data => {
      const usersData = JSON.parse(data);
      const isExist = usersData.users.find((user: User) => user.username === newUser.username);
      if(!isExist) {
        const { password } = newUser;
        hashPassword(password).then(hashed => {
          usersData.users.push({ username: newUser.username, password: hashed });
          return save
            ? writeFileAsync(`./src/db/usersDb.json`, JSON.stringify(usersData, null, ' ')).then(() => false) 
            : Promise.resolve(false);
        })
      } else {
        return Promise.resolve(true);
      }
    })
    .catch(err => {
      console.log('File operation error: ' + err)
    })
}

export { checkIfUserExist }