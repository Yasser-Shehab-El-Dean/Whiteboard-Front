import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn, signOut, useSession } from "next-auth/react";

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

        const res = await fetch("https://dummyjson.com/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
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

        console.log({ Login_Response: user });

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

  session: {
    strategy: "jwt",
  },

  callbacks: {
    // async jwt({ token, account }) {
    //   if (account) {
    //     token = Object.assign({}, token, { access_token: account.access_token });
    //     console.log(account);
    //   }
    //   console.log(token);
    //   return token;
    // },
    async jwt({ token, user }) {
      if (user) {
        console.log("inside jwt callback", user);
      }

      return token;
    },

    async session({ token, session }) {
      session.user = {
        // @ts-ignore
        token: token,
        email: token.email, // Replace with the appropriate property from the token
        image: token.picture,
        // Replace with the appropriate property from the token
      };
      console.log({ Token_Details: token, Session_Details: session });

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/auth/signIn",
  },
});
