import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { JWT } from "next-auth/jwt";
import UserModel from "@/models/user.model";
import mongoose from "mongoose";
import { connectToDatabase } from "./connectToDb";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Username and password are required");
        }

        const { username, password } = credentials;

        await connectToDatabase();

        const user = await UserModel.findOne({ username });

        if (!user) {
          throw new Error("User not found");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new Error("Invalid password");
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user/whoami?id=${user?._id}`,
          { cache: "no-store" }
        );
        const data = await res.json();
        const userWithPermissionAndRole = data?.data?.[0];
        if (
          !userWithPermissionAndRole?.role ||
          userWithPermissionAndRole?.permissions?.length < 1
        )
          if (!user) {
            throw new Error("User has no role or permissions");
          }

        return {
          id: (
            userWithPermissionAndRole._id as mongoose.Types.ObjectId
          ).toString(),
          name: userWithPermissionAndRole?.name,
          username: userWithPermissionAndRole?.username,
          email: userWithPermissionAndRole?.email,
          role: userWithPermissionAndRole?.role,
          permissions: userWithPermissionAndRole.permissions,
        } as User;
      },
    }),
  ],
  pages: {
    // signIn: "/",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.username = user.username;
        token.email = user.email;
        token.role = user.role;
        token.permissions = user.permissions;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.permissions = token.permissions;
      }
      return session;
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    maxAge: 30 * 24 * 60 * 60,
  },
};

export default authOptions;
