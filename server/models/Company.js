import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    status: { 
        type: Boolean,
        default: true,
    },
    date: { 
        type: Date,
        default: Date.now,
    }
})

export default mongoose.model('Company',CompanySchema);
