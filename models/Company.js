import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
    title: String,
    numOfEmployees: Number
});

const Company = mongoose.model('Company', companySchema);

export default Company;