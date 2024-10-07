const express = require('express');
const Employee = require('../models/employee');

const router = express.Router();

router.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json({ data: employees });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/employees', async (req, res) => {
    try {
        const newEmployee = new Employee(req.body);
        await newEmployee.save();
        res.status(201).json({ data: newEmployee });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/employees/:eid', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.eid);
        if (!employee)
            return res.status(404).json({ message: 'Employee not found.' });
        
        res.status(200).json({ data: employee });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/employees/:eid', async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true });
        if (!updatedEmployee)
            return res.status(404).json({ message: 'Employee not found.' });

        res.status(200).json({ data: updatedEmployee });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/employees', async (req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.query.eid);
        if (!deletedEmployee)
            return res.status(404).json({ message: 'Employee not found.' });

        res.status(204).end();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;