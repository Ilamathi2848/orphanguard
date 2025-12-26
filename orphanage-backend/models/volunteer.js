const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    availability: { type: String, required: true },
    skills: { type: String },
    roles: { type: [String] },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Volunteer", volunteerSchema);

