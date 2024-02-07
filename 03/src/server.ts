import express, { Express, Request, Response } from "express";
import { User } from "./types";
import { addUser, getAllUsers } from "./helpers";

const app: Express = express();
app.use(express.json());

app.route('/users')
  .get(async (req: Request, res: Response) => {
    try {
      const users = await getAllUsers();
      res.json(users);
    } catch (error) {
      console.error('Retrieving users from database error', error);
      res.status(500).send('Retrieving users from database error');
    }
  })
  .post(async (req: Request, res: Response) => {
    const newUser: User = req.body;
    try {
      await addUser(newUser);
      res.status(201).send('User added successfully');
    } catch (error) {
      console.error('Error adding user:', error);
      res.status(500).send('Error adding user to database');
    }
  });

export { app };