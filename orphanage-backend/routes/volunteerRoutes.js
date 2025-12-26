const express = require("express");
const Volunteer = require("../models/Volunteer");
const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { name, email, phone, city, reason } = req.body;

        const volunteer = new Volunteer({
            name,
            email,
            phone,
            city,
            reason
        });

        await volunteer.save();

        res.status(201).json({ message: "Volunteer registered successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
