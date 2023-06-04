import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";
const clientId = process.env.REACT_GOOGLE_ID;
const clientSecret = process.env.REACT_CLIENT_SECRET;

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId,
      clientSecret,
    }),
  ],
  async session({ session }) {
    const sessionUser = await User.findOne({ email: session.user.email });
    session.user.id = sessionUser._id.toString();
    return session;
  },
  async signIn({ profile }) {
    try {
      await connectToDB();
      const userExist = await User.findOne({ email: profile });
      if (!userExist) {
        await User.create({
          email: profile.email,
          username: profile.username.replace(" ", "").toLowerCase(),
          image: profile.image,
        });
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
});

export { handler as GET, handler as POST };
