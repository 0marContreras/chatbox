import bcrypt from "bcrypt"

export async function hashPassword(password){
    let newPassword = await bcrypt.hash(password,10);
    return newPassword
}