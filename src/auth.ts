import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials"
import { hashPassword } from "./lib/hash";
const bcrypt = require("bcrypt");
import User from "./models/User";
import connectToDatabase from "./lib/db";

connectToDatabase();

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const user = await User.findOne({ email: credentials.email });
 
        if (!user) {
          throw new Error("User not found.")
        }

        //const hashedPass = hashPassword(credentials.password)

        if (!user || !(await bcrypt.compare(credentials.password,user.password))){
          throw new Error('[-] Invalid email or password')
      }
        // return user object with the their profile data
        return user
      },
    }),
  ],
})