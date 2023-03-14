const jwt = require('jsonwebtoken');

const verifyAuth = async (req, res, next) => {
    try {
        let token = req.cookies["jwtUser"];

        if (!token) res.status(403).send("Access Denied");
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        console.log(verified);
        req.userId = verified;
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}

module.exports = verifyAuth;