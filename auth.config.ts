import type { NextAuthConfig } from "next-auth";
import Credentials, {
  CredentialsConfig,
} from "next-auth/providers/credentials";
import { login } from "./services";

const credentialsConfig: CredentialsConfig = Credentials({
  name: "Credentials",
  credentials: {
    email: { label: "Email" },
    password: { type: "password", label: "Password" },
  },
  async authorize(credentials) {
    const user = await login({
      username: credentials.email as string,
      password: credentials.password as string,
    })
      .then((res) => {
        return {
          email: credentials.email as string,
          role: res.type,
          accessToken: res.access,
          refreshToken: res.refresh,
        };
      })
      .catch((err) => {
        throw new Error("Error happened", err);
      });

    if (!user) {
      return null;
    }

    return user;
  },
});

export default {
  providers: [credentialsConfig],

  callbacks: {
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.accessToken = token.accessToken as string;
        session.user.refreshToken = token.refreshToken as string;
        // @ts-ignore
        session.user.role = token.role as string;
      }
      return session;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.role = user.role;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig;
