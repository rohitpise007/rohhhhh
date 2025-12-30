const jwt = require('jsonwebtoken');
const User = require('../models/Doctor');

const APMNTMNG_middleware = async (req, res, next) => {
    try{
        const token = req.cookies.authorization?.replace('Bearer ', '') || req.headers.authorization?.replace('Bearer ', '');
        if (!token) {
        return res.status(401).json({ message: 'Authorization token missing' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "defaultsecret");
        
            // attach user id to request
            req.userId = decoded.id;
            next();


    }catch(error){
        return res.status(error, "login frist");
    }

};
module.exports = APMNTMNG_middleware;