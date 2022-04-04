import mongoose from "mongoose";

const Schema = mongoose.Schema

const CompanySchema = new Schema({
    name: { 
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
    country: {
        type: Schema.Types.ObjectId,
        ref: "Country"
    },
    waterProperties: [{
        type: Schema.Types.ObjectId,
        ref: "Properties"
    }],
    date: { 
        type: Date,
        default: Date.now,
    }
})

export default mongoose.model('Company',CompanySchema);
