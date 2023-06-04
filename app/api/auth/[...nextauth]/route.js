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
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();
        const { email, name, picture } = profile;
        const userExist = await User.findOne({ email });

        if (!userExist) {
          console.log("signIn ~ picture:", picture);

          console.log("signIn ~ name:", name);

          console.log("signIn ~ email:", email);

          await User.create({
            email,
            username: name.replaceAll(" ", "").toLowerCase(),
            image: picture,
          });
        }
        return true;
      } catch (error) {
        console.log(error, "hiiiiiiiiiiii-----------");
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
