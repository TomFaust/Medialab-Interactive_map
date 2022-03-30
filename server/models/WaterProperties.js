const  mongoose = require("mongoose");

const WaterProperties = new mongoose.Schema({
    companyId: {
        type: Number
    },
    temperature: { 
        value: { 
            type: Number,
            min: 0,
            max: 25
        },
        unit: {
            type: String,
            default: "Celsius",
            match: "Celsius"
        }
    },
    hardness: { 
        value: { 
            type: Number,
            min: 1.0,
            max: 2
        },
        unit: {
            type: String,
            default: "mmol/l",
            match: "mmol/l"
        },
    },
    turbidity: { 
        value: { 
            type: Number,
            min: 0,
            max: 4
        },
        unit: {
            type: String,
            default: "FTE",
            match: "FTE"
        }
    },
    health: {
        nitrate: {
            value: { 
                type: Number,
                min: 0,
                max: 50
            },
            unit: {
                type: String,
                default: "mg/l",
                match: "mg/l"
            }
        },
        nitrite: {
            value: { 
                type: Number,
                min: 0,
                max: 0.1
            },
            unit: {
                type: String,
                default: "mg/l",
                match: "mg/l"
            }
        },
        fluoride: {
            value: { 
                type: Number,
                min: 0,
                max: 1.1
            },
            unit: {
                type: String,
                default: "mg/l",
                match: "mg/l"
            }
        },
    },
    taste: {
        water_extraction_area: {
            type: String,
        },
        sulfate: {
            value: { 
                type: Number,
                min: 0,
                max: 150
            },
            unit: {
                type: String,
                default: "mg/l",
                match: "mg/l"
            }
        },
        magnesium: {
            value: { 
                type: Number,
                min: 0,
            },
            unit: {
                type: String,
            }
        },
        natrium: {
            value: { 
                type: Number,
                min: 0,
                max: 150
            },
            unit: {
                type: String,
                default: "mg/l",
                match: "mg/l"
            }
        },
        chloride: {
            value: { 
                type: Number,
                min: 0,
                max: 150
            },
            unit: {
                type: String,
                default: "mg/l",
                match: "mg/l"
            }
        },
        magnesiumcarbonate: {
            value: { 
                type: Number,
                min: 0,
            },
            unit: {
                type: String,
            }
        },
        calciumcarbonate: {
            value: { 
                type: Number,
                min: 0,
            },
            unit: {
                type: String,
            }
        }
    },
    date: { 
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Properties',WaterProperties);
