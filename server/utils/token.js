import jwt from 'jsonwebtoken';

const generateToken = (student) => {
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is missing in environment variable');
  }

  return jwt.sign({ id: student._id, name: student.name, email: student.email, role: student.role, password: student.password, age:student.age }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export default generateToken;
