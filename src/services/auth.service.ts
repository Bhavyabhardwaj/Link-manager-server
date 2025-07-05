import prisma from "../config/db";
import { BadRequestError, NotFoundError } from "../errors";
import { bcryptUtil, jwtUtil } from "../utils";
import { authValidation } from "../validation";


export const signIn = async({username, password}: authValidation.SigninInput)=> {

    const user = await prisma.user.findUnique({
        where: {
            username
        }
    });
    if (!user) {
        throw new NotFoundError("User not found");
    }
    
    const isPasswordValid = await bcryptUtil.verifyPassword(password, user.password);

    if (!isPasswordValid) {
        throw new BadRequestError("Invalid username or password");
    }

    // Remove password from user object before returning
    const { password: _, ...userWithoutPassword } = user;
    
    // jwt need data and expiresIn
    const payload = {
        data: {
            id: user.id,
            user: userWithoutPassword
        },
        expiresIn: "1d"
    }
    
    const token = jwtUtil.generateToken(payload);
    return {
        user: userWithoutPassword,
        token
    };
}