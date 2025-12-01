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
        default: "unchecked",
    },
    disease: {
        type: String,
        default: "Healthy",
        required: true,
    },
    // date: {
    //     type: Date,
    //     required: true,
    // },
    about:{
        type:String,

    } 
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
