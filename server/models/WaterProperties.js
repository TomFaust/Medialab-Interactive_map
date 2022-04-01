const  mongoose = require("mongoose");

const WaterProperties = new mongoose.Schema({
    companyId: {
        type: Number
    },
    temperature: [{ 
        value: { 
            type: Number,
            min: 0,
            max: 25
        },
        unit: {
            type: String,
            default: "Celsius",
            match: "Celsius"
        },
        maxValue: {
            type: Number,
            match: 25,
        }
    }],
    hardness: [{ 
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
        maxValue: {
            type: Number,
            match: 2,
        }
    }],
    turbidity: [{ 
        value: { 
            type: Number,
            min: 0,
            max: 4
        },
        unit: {
            type: String,
            default: "FTE",
            match: "FTE"
        },
        maxValue: {
            type: Number,
            match: 4,
        }
    }],
    health: [{
        nitrate: [{
            value: { 
                type: Number,
                min: 0,
                max: 50
            },
            unit: {
                type: String,
                default: "mg/l",
                match: "mg/l"
            },
            maxValue: {
                type: Number,
                match: 50,
            }
        }],
        nitrite: [{
            value: { 
                type: Number,
                min: 0,
                max: 0.1
            },
            unit: {
                type: String,
                default: "mg/l",
                match: "mg/l"
            },
            maxValue: {
                type: Number,
                match: 0.1,
            }
        }],
        fluoride: [{
            value: { 
                type: Number,
                min: 0,
                max: 1.1
            },
            unit: {
                type: String,
                default: "mg/l",
                match: "mg/l"
            },
            maxValue: {
                type: Number,
                match: 1.1,
            }
        }],
    }],
    taste: [{
        water_extraction_area: {
            type: String,
            enum: ['Groundwater','Surface water','Dune water'],
        },
        sulfate: [{
            value: { 
                type: Number,
                min: 0,
                max: 150
            },
            unit: {
                type: String,
                default: "mg/l",
                match: "mg/l"
            },
            maxValue: {
                type: Number,
                match: 150,
            }
        }],
        natrium: [{
            value: { 
                type: Number,
                min: 0,
                max: 150
            },
            unit: {
                type: String,
                default: "mg/l",
                match: "mg/l"
            },
            maxValue: {
                type: Number,
                match: 150,
            }
        }],
        chloride: [{
            value: { 
                type: Number,
                min: 0,
                max: 150
            },
            unit: {
                type: String,
                default: "mg/l",
                match: "mg/l"
            },
            maxValue: {
                type: Number,
                match: 150,
            }
        }],
    }],
    date: { 
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Properties',WaterProperties);
