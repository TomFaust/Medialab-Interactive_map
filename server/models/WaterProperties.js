const  mongoose = require("mongoose");

const WaterProperties = new mongoose.Schema({
    companyId: {
        type: Number
    },
    temperature: { 
        type: Number,
    },
    hardness: { 
        type: String,
    },
    turbidity: { 
        type: String,
    },
    health: {
        nitrate: { 
            type: Number,
        },
        nitrite: {
            type: Number,
        },
        fluoride: {
            type: Number,
        },
    },
    taste: {
        water_extraction_area: {
            type: String,
        },
        sulfate: {
            type: Number,
        },
        magnesium: {
            type: Number,
        },
        natrium: {
            type: Number,
        },
        chloride: {
            type: Number,
        },
        magnesiumcarbonate: {
            type: Number,
        },
        calciumcarbonate: {
            type: Number,
        }
    },
    date: { 
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Properties',WaterProperties);
