const jwt = require('jsonwebtoken');
const Doctor = require('../models/Doctor');

const APMNTMNG_middleware = async (req, res, next) => {
    try{
        const token = req.cookies.authorization?.replace('Bearer ', '') || req.headers.authorization?.replace('Bearer ', '');
        if (!token) {
        return res.status(401).json({ message: 'Authorization token missing' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "defaultsecret");

        // Verify that the user is a doctor
        const doctor = await Doctor.findById(decoded.id);
        if (!doctor) {
            return res.status(403).json({ message: 'Access denied. Doctor privileges required.' });
        }

        // attach user id to request
        req.userId = decoded.id;
        req.doctorId = decoded.id;
        next();

    }catch(error){
        console.error('Doctor middleware error:', error);
        return res.status(401).json({ message: 'Invalid token or login required' });
    }

};
module.exports = APMNTMNG_middleware;