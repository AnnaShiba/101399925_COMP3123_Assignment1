import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    first_name: { type: String, required: true, maxlength: 100 },
    last_name: { type: String, required: true, maxlength: 50 },
    email: { type: String, required: true, unique: true, maxlength: 50 },
    position: { type: String, required: true, unique: true, maxlength: 50 },
    salary: { type: Number, required: true },
    date_of_joining: { type: Date, required: true },
    department: { type: String, enum: ['Engineering', 'Product', 'Sales'], maxlength: 25 },
});

module.exports = mongoose.model("Employee", employeeSchema);