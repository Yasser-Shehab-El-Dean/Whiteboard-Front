import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Session } from "next-auth";

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("Please Provide Process.env.NEXTAUTH_SECRET environment Variables");
}
export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        const res = await fetch("https://sso2.apollonia.health/user/authenticate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            UserName: credentials?.username,
            Password: credentials?.password,
          }),
        });

        const user = await res.json();

        console.log({ userData: user });

        if (user && user.message !== "Invalid credentials") {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/auth/signIn",
  },
});
