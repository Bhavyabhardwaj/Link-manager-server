import jwt, { SignOptions } from 'jsonwebtoken';
import { JWT_SECRET } from '../config/jwtConfig';

export const generateToken = ({data, expiresIn}: {data: object, expiresIn?: string}) => {
    return jwt.sign(data, JWT_SECRET, { expiresIn } as SignOptions);
}

export const verifyToken = ( token : string ) => {
    try {
        const data = jwt.verify(token, JWT_SECRET);
        return {
            valid : true,
            data
        }
    } catch (error) {
        return {
            valid : false,
            data : null
        }
    }
}