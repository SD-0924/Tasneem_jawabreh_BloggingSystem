import jwt from 'jsonwebtoken';

export const generateToken = (user: { id: number }) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
    expiresIn: '1d',
  });
};
