const  mongoose = require("mongoose");

const CountrySchema = mongoose.Schema({
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
        required: true,
    },
    temperature: { 
        type: Number,
        required: true,
    },
    hardness: { 
        type: String,
        required: true,
    },
    turbidity: { 
        type: String,
        required: true,
    },
    health: {
        nitrate: { 
            type: Number,
            required: true,
        },
        nitrite: {
            type: Number,
            required: true,
        },
        fluoride: {
            type: Number,
            required: true,
        },
    },
    taste: {
        water_extraction_area: {
            type: String,
            required: true,
        },
        sulfate: {
            type: Number,
            required: true,
        },
        magnesium: {
            type: Number,
            required: true,
        },
        natrium: {
            type: Number,
            required: true,
        },
        chloride: {
            type: Number,
            required: true,
        },
        magnesiumcarbonate: {
            type: Number,
            required: true,
        },
        calciumcarbonate: {
            type: Number,
            required: true,
        },
        chloride: {
            type: Number,
            required: true,
        }
    }
})