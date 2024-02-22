import fs from 'fs';
import { promisify } from 'util';

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

//check if db.json exist and create if not
const createDefaultDb = (dbName: string, defaultData: Object) => {
  readFileAsync(`./src/db/${dbName}.json`, 'utf8')
    .then(data => {
      if (typeof JSON.parse(data) == undefined) return;
    })
    .catch(() => {
      return writeFileAsync(`./src/db/${dbName}.json`, JSON.stringify(defaultData, null, ' '))
    })
    .then(() => {
      console.log('Default data created or already exist');
    })
    .catch(err => {
      console.log('Creating default data error: ' + err)
    })
}

export { createDefaultDb }