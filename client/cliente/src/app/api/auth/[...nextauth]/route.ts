import next from "next";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        matricula: { label: "Matricula", type: "text" },
        senha: { label: "Senha", type: "password" },
      },

      async authorize(credentials, req) {
        const response = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            matricula: credentials?.matricula,
            senha: credentials?.senha,
          }),
        });
        const user = await response.json();
        
        const decodedUser = jwt.decode(user.acess_token);

        if (user && response.ok) {
          console.log(user)
          return user;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};


const handler = NextAuth(nextAuthOptions);
export { handler as GET, handler as POST, nextAuthOptions };
