import mongoose from "mongoose";
import Company from "../models/Company.js"

const roles = ['user', 'admin']

const getCompanyNames = () => {Company.find({}, async function(err, companies) {
    await companies.forEach(function(company) {
        roles.push(company.name)
    });
    return roles
})};


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    role: {
        type: String,
        default: 'user',
        enum: getCompanyNames()
    },
    date: { 
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('User',UserSchema);
