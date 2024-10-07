import express from 'express';
import mongoose from 'mongoose';

const app = express();

const userRoutes = require('./users');
const Employee = require('../models/employee');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/v1/user', userRoutes);

app.get("/", (req, res) => res.send("Express on Vercel"));

app.get('/api/v1/emp/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
});
mongoose.connect(process.env.MONGODB_URI, {})
    .then(_ => app.listen(3123, () => console.log("Server ready on port 3123 with MongoDB.")))
    .catch(error => console.log(error));

export default app;