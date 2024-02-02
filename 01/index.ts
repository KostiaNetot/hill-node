// import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import * as http from "http";

// //For env File 
dotenv.config();

const port = process.env.PORT || 8000;

const server = http.createServer((req, res) => {
  res.write('<h1>Hello from Node!!</h1>');
  res.end();
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

server.on('error', e => console.error("Error", e));

