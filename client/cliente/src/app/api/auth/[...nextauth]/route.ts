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
        console.log(credentials?.matricula, credentials?.senha);
        const user = await response.json();

        console.log(user);

        if (user && response.ok) {
          console.log(extractUserFromToken(user.acess_token));
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

const token = "potato";
export const extractUserFromToken = (
  token: string
): { [key: string]: any } | null => {
  try {
    const decodedToken = jwt.decode(token);

    if (decodedToken) {
      // Se desejar, você pode fazer validações adicionais aqui
      return decodedToken as { [key: string]: any };
    }

    return null;
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
    return null;
  }
};

const handler = NextAuth(nextAuthOptions);
export { handler as GET, handler as POST, nextAuthOptions };
