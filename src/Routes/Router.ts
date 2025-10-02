import { Router } from 'express';

 const Route = Router();

Route.get('/', (req, res) => {
  res.send("What's up doc ?!");
});

export default Route;