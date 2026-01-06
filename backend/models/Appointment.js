 const mongoose = require('mongoose');
const validator = require('validator');

const AppointmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Doctor",
        required:true,
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "completed", "cancelled", "rejected"],
        default: "pending",
    },
    disease: {
        type: String,
        default: "Healthy",
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100
    },
    appointmentDate: {
        type: Date,
        required: true,
    },
    appointmentTime: {
        type: String,
        required: true,
        match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time in HH:MM format']
    },
    about: {
        type: String,
        trim: true,
        maxlength: 500
    },
    symptoms: [{
        type: String,
        trim: true
    }],
    notes: {
        type: String,
        trim: true,
        maxlength: 1000
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high", "urgent"],
        default: "medium"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
