import mongoose from "mongoose";

const Schema = mongoose.Schema

const temperature = Schema({
    value: {
        type: Number,
        min: 0,
        max: 25
    },
    unit: {
        type: String,
        default: "Celsius",
    },
    maxValue: {
        type: Number,
        default: 25,
    }
}, { _id : false });

const hardness = Schema({
    value: { 
        type: Number,
        min: 1.0,
        max: 2
    },
    unit: {
        type: String,
        default: "mmol/l",
    },
    maxValue: {
        type: Number,
        default: 2,
    }
}, { _id : false });

const turbidity = Schema({
    value: { 
        type: Number,
        min: 0,
        max: 4
    },
    unit: {
        type: String,
        default: "FTE",
    },
    maxValue: {
        type: Number,
        default: 4,
    }
}, { _id : false });

const health = Schema({
    nitrate: {
        value: { 
            type: Number,
            min: 0,
            max: 50
        },
        unit: {
            type: String,
            default: "mg/l",
        },
        maxValue: {
            type: Number,
            default: 50,
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
        },
        maxValue: {
            type: Number,
            default: 0.1,
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
        },
        maxValue: {
            type: Number,
            default: 1.1,
        }
    },
}, { _id : false });

const taste = Schema({
    water_extraction_area: {
        type: String,
        enum: ['groundwater','surface water','dune water'],
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
        },
        maxValue: {
            type: Number,
            default: 150,
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
        },
        maxValue: {
            type: Number,
            default: 150,
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
        },
        maxValue: {
            type: Number,
            default: 150,
        }
    }
}, { _id : false });


const WaterProperties = new Schema({
    company: {
        type: Schema.Types.ObjectId,
        ref: "Company"
    },
    period: {
        type: String,
        required: true,
        enum: ['q1','q2','q3', 'q4'],
    },
    temperature: [temperature],
    hardness: [hardness],
    turbidity: [turbidity],
    health: [health],
    taste: [taste],
    date: { 
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Properties',WaterProperties);
