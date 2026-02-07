import jwt from 'jsonwebtoken';

const authenticateStudent = async (req, res, next) => {
    try {
        
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Access denied!. no jwt token provided' });
        }

        const JWT_SECRET = process.env.JWT_SECRET;
        const decodedToken = jwt.verify(token, JWT_SECRET);
        req.student = decodedToken;
        next()


    } catch (error) {
        return res.status(401).json({ message: 'Invalid jwt token' });
    }
}

export default authenticateStudent;