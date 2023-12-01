import next from "next";
import { NextAuthOptions, User } from "next-auth";
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
        if (user && response.ok) {
          return user;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt ({ token, user}) {
      if (user) {
        token.user = user;
      }

      return token;
    },

    async session ({ session, token }) {
      session = token.user as any;
      return session;
    }
  }
};

const handler = NextAuth(nextAuthOptions);
export { handler as GET, handler as POST, nextAuthOptions };
