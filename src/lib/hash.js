import bcrypt from "bcrypt"

export async function hashPassword(password){
    let newPassword = await bcrypt.hash(password,10);
    return newPassword
}

export async function generateToken(){
    const randomNum = Math.random() * 9000
    return Math.floor(1000 + randomNum)
 }
 