import express from 'express';
import mongoose from 'mongoose';

const app = express();

const userRoutes = require('./users');
const employeeRoutes = require('./employee');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);

app.get("/", (req, res) => res.send("COMP 3123 Assignment 1 by Anna"));

mongoose.connect(process.env.MONGODB_URI, {})
    .then(_ => app.listen(3123, () => console.log("Server ready on port 3123 with MongoDB.")))
    .catch(error => console.log(error));

export default app;