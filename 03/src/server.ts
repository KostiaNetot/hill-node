import fs from 'fs';
import { promisify } from 'util';
import express, { Express, Request, Response } from "express";
import { User } from "./types";

const app: Express = express();
app.use(express.json());

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

app.route('/users')
  .get(async (req: Request, res: Response) => {
    readFileAsync('db.json', 'utf8')
      .then(data => {
        console.log(data);
        res.send(JSON.parse(data));
      })
      .catch(err => {
        console.log('File operation error: ' + err)
      })
  })
  .post(async (req: Request, res: Response) => {
    const newUser: User = req.body;
    readFileAsync('db.json', 'utf8')
      .then(data => {
        const usersData = JSON.parse(data);
        usersData.users.push(newUser);
        return writeFileAsync('db.json', JSON.stringify(usersData, null, ' '));
      })
      .then(() => {
        res.send('New user added successfully')
      })
      .catch(err => {
        console.log('File operation error: ' + err)
      })
  });

export { app };