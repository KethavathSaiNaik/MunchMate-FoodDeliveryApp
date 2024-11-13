var jwt = require('jsonwebtoken');
const jwtSecret = "HaHa";

const fetch = (req, res, next) => {
    // Get the token from the Authorization header
    const token = req.header('Authorization');
    console.log(token);
    
    if (!token) {
        return res.status(401).send({ error: "Invalid Auth Token" }); // Use 401 for unauthorized
    }

    // If the token starts with "Bearer ", remove it
    const bearerToken = token.startsWith('Bearer ') ? token.slice(7) : token;

    try {
        const data = jwt.verify(bearerToken, jwtSecret);
        req.user = data.user; // Attach user information to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(401).send({ error: "Invalid Auth Token" }); // Send 401 for invalid token
    }
};

module.exports = fetch;
