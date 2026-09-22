import type { NextAuthConfig } from "next-auth";

/**
 * Edge-compatible auth config. Middleware runs on the Edge runtime, which
 * cannot load bcryptjs or the Prisma client — so this config carries only
 * the pieces middleware needs (session shape callbacks) and none of the
 * providers that touch the database or hash passwords. The full config
 * with providers lives in lib/auth.ts and extends this one.
 */
export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
    newUser: "/register",
    error: "/login",
  },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role ?? "CUSTOMER";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "CUSTOMER" | "ADMIN" | "SUPER_ADMIN";
      }
      return session;
    },
  },
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
};
