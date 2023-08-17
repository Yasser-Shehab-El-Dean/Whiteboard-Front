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

        if (res.status === 200) {
          // Request was successful
          console.log("Success!");
        } else {
          // Request failed
          console.log(`Request failed with status: ${res.status}`);
        }

        console.log({ userData: user });

        if (user && user !== "Incorrect username or password") {
          console.log("successful Login");
          return user;
        } else {
          console.log("failed Login");

          throw new Error(JSON.stringify({ errors: user, status: false }));
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, session }) {
      console.log("jwt callback", { user, session, token });
      return token;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/auth/signIn",
  },
});
