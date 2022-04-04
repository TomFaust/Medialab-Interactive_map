import mongoose from "mongoose";

const Schema = mongoose.Schema

const CountrySchema = new Schema({
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
        default: true
    },
    companies: [{
        type: Schema.Types.ObjectId,
        ref: "Company"
    }],
    date: { 
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Country', CountrySchema);
