import fs from 'fs';
import { promisify } from 'util';
import { User } from "../types/types";

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const checkIfUserExist = (newUser: User) => {
  return readFileAsync(`./src/db/usersDb.json`, 'utf8')
    .then(data => {
      const { users } = JSON.parse(data);
      const isExist = users.find((user: User) => user.username === newUser.username);
      if(!isExist) {
        users.push(newUser);
        return writeFileAsync(`./src/db/usersDb.json`, JSON.stringify(users, null, ' '))
          .then(() => false)
      } else {
        return Promise.resolve(true);
      }
    })
    .catch(err => {
      console.log('File operation error: ' + err)
    })
}

export { checkIfUserExist }