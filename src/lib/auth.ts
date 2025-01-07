import  bcryptjs  from 'bcryptjs';
import User from "@/models/User.model";

export async function verifyCredentials(email:string, password:string){
    const user = await User.findOne({email})
    if(!user){
        return null
    }
    const isValidPassword = await bcryptjs.compare(password, user.password)
    if(!isValidPassword){
        return null
    }
    const {password: _, ...userWithoutPassword} = user.toObject()
    return userWithoutPassword
}